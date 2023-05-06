import { atom } from "jotai";
import { atomFamily, atomWithStorage, loadable } from "jotai/utils";
import type { Layer as DeckGLLayer } from "@deck.gl/core/typed";

import { datasets } from "~/atoms/dataset";
import { datetime } from "~/atoms/datetime";
import { getDeckGlLayer, getParams } from "~/utils/layer";

export type LayerSettings = {
  name: string;
  product: string;
  type: "h3" | "grid";
  palette: string[];
  opacity: number;
  blendMode: string;
  visible: boolean;

  // can override global date
  year?: string;
  month?: string;
  day?: string;
  time?: string;
};

export type Layer = LayerSettings & {
  state: "requested" | "loading" | "processing" | "loaded" | "error";
  layer?: DeckGLLayer;
};

type Init = {
  action: "init";
  layer: LayerSettings;
};
type Add = {
  action: "add";
  layer: LayerSettings;
};
type Edit = {
  action: "edit";
  layer: Partial<LayerSettings> & Pick<LayerSettings, "name">;
};
type Remove = {
  action: "remove";
  layer: Partial<LayerSettings> & Pick<LayerSettings, "name">;
};

export type Update = Init | Add | Edit | Remove;

const settings = atomWithStorage<LayerSettings[]>("layers", []);

const family = atomFamily((_name: Layer["name"]) => atom<Layer | null>(null));

export const edit = atom<Partial<LayerSettings> | null>(null);

export const layers = atom(
  (get) =>
    get(settings)
      .map(({ name }) => get(family(name)))
      .filter((layer): layer is Layer => layer !== null),
  (get, set, update: Update | ((layers: LayerSettings) => void)) => {
    if (typeof update === "function") {
      const layers = get(settings);
      for (const layer of layers) {
        update(layer);
      }
      return;
    }

    if (update.action === "add") {
      set(settings, (settings) => [...settings, update.layer]);
    }

    if (update.action === "edit") {
      set(settings, (settings) =>
        settings.map((layer) => {
          if (layer.name !== update.layer.name) {
            return layer;
          }
          return {
            ...layer,
            ...update.layer,
          };
        })
      );
    }

    if (update.action === "remove") {
      set(settings, (settings) =>
        settings.filter((layer) => layer.name !== update.layer.name)
      );
    }

    if (
      update.action === "edit" ||
      update.action === "add" ||
      update.action === "init"
    ) {
      const date = get(datetime);
      const newLayer = update.layer;
      const oldLayer = get(family(newLayer.name));
      const oldParams = oldLayer && getParams(oldLayer, date);
      const params = getParams({ ...oldLayer, ...newLayer }, date);

      if (params && (!oldParams || oldParams.key !== params.key)) {
        const layer = newLayer as LayerSettings;
        set(family(layer.name), { ...layer, state: "loading" });
        get(datasets(params)).then((dataset) => {
          set(family(newLayer.name), {
            ...layer,
            state: "loaded",
            layer: getDeckGlLayer(dataset, layer),
          });
        });
      } else {
        const prevLayer = oldLayer as Layer;
        const layer = { ...prevLayer, ...newLayer };
        set(family(layer.name), layer);
        if (
          layer.layer &&
          (layer.visible !== prevLayer.visible ||
            layer.palette !== layer.palette ||
            layer.opacity !== prevLayer.opacity ||
            layer.blendMode !== prevLayer.blendMode)
        ) {
          layer.layer = layer.layer.clone({ ...newLayer });
        }
      }
    }
  }
);

layers.onMount = (setLayers) => {
  setLayers((layer) => {
    setLayers({ action: "init", layer });
  });
};

export default { edit, layers };
