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
  layer: LayerSettings;
};
type Remove = {
  action: "remove";
  layer: Pick<LayerSettings, "name">;
};

export type Update = Init | Add | Edit | Remove;

const settings = atomWithStorage<LayerSettings[]>("layers", []);

const family = atomFamily((_name: Layer["name"]) => atom<Layer | null>(null));

export const edit = atom<Partial<LayerSettings> | null>(null);

export const layers = atom(
  (get) =>
    get(settings)
      .map(({ name }) => get(family(name)))
      .filter(Boolean),
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
        settings.map((layer) =>
          layer.name === update.layer.name ? update.layer : layer
        )
      );
    }

    if (
      update.action === "edit" ||
      update.action === "add" ||
      update.action === "init"
    ) {
      const dt = get(datetime);
      const newLayer = update.layer;
      const oldLayer = get(family(newLayer.name));
      const oldParams = oldLayer && getParams(oldLayer, dt);
      const newParams = getParams(newLayer, dt);

      if (!newParams) {
        return;
      }

      if (!oldParams || oldParams.key !== newParams.key) {
        set(family(newLayer.name), { ...newLayer, state: "loading" });
        get(datasets(newParams)).then((dataset) => {
          set(family(newLayer.name), {
            ...newLayer,
            state: "loaded",
            layer: getDeckGlLayer(dataset, newLayer),
          });
        });
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
