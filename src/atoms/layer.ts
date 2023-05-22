import { atom } from "jotai";
import { atomFamily, atomWithStorage, loadable } from "jotai/utils";
import type { Layer as DeckGLLayer } from "@deck.gl/core/typed";

import { Dataset, datasets } from "~/atoms/dataset";
import { datetime } from "~/atoms/datetime";
import { getDeckGlLayer, getParams } from "~/utils/layer";

export type LayerSettings = {
  key: string;
  name: string;
  product: string;
  type: "h3" | "grid" | "contour" | "raw";
  palette: string;
  opacity: number;
  visible: boolean;

  variable?: string;
  // can override global date
  year?: string;
  month?: string;
  day?: string;
  time?: string;
};

export type Layer = LayerSettings & {
  state: "loading" | "loaded" | "error";
  layer?: DeckGLLayer;
  dataset?: Dataset;
};

type PartialSettings = Partial<LayerSettings> & Pick<LayerSettings, "key">;

type Init = {
  action: "init";
};
type Add = {
  action: "add";
  layer: LayerSettings;
};
type Edit = {
  action: "edit";
  layer: Partial<LayerSettings> & Pick<LayerSettings, "key">;
};
type Remove = {
  action: "remove";
  layer: Partial<LayerSettings> & Pick<LayerSettings, "key">;
};

export type Update = Init | Add | Edit | Remove;

const settings = atomWithStorage<LayerSettings[]>("layers", [
  {
    visible: true,
    key: "layer0",
    product: "reanalysis-era5-land/2m_temperature",
    name: "Temperature Contour",
    palette: "Constant.White",
    type: "contour",
    opacity: 1,
  },
  {
    visible: true,
    key: "layer1",
    product: "reanalysis-era5-land/2m_temperature",
    name: "Temperature Fill",
    palette: "Divergent.RdYlGn",
    type: "h3",
    opacity: 0.75,
  },
]);

const family = atomFamily((_name: Layer["key"]) => {
  const layerSettings = atom<PartialSettings | null>(null);
  return atom(
    (get) => {
      const settings = get(layerSettings);
      const date = get(datetime);
      const params = settings && getParams(settings, date);
      const dataset = params && get(loadable(datasets(params)));

      if (!settings) {
        return null;
      }

      if (!params || !dataset) {
        return {
          ...settings,
          state: "error",
        };
      }

      if (dataset.state === "loading") {
        return {
          ...settings,
          state: "loading",
        };
      }

      if (dataset.state === "hasError") {
        console.warn(dataset.error);
        return {
          ...settings,
          state: "error",
        };
      }

      if (
        dataset.state === "hasData" &&
        dataset.data != null &&
        settings.palette != null &&
        settings.opacity != null &&
        settings.visible != null
      ) {
        return {
          ...settings,
          state: "loaded",
          dataset: dataset.data,
          layer: getDeckGlLayer(dataset.data, settings as LayerSettings),
        };
      }
    },
    (_get, set, layer: PartialSettings | null) => {
      set(layerSettings, layer);
    }
  );
});

export const edit = atom<Partial<LayerSettings> | null>(null);

export const layers = atom(
  (get) =>
    get(settings)
      .map(({ key }) => get(family(key)))
      .filter((layer): layer is Layer => layer != null),
  (get, set, update: Update) => {
    if (update.action === "init") {
      for (const layer of get(settings)) {
        set(family(layer.key), layer);
      }
    }

    if (update.action === "add") {
      set(family(update.layer.key), update.layer);
      set(settings, (settings) => [...settings, update.layer]);
    }

    if (update.action === "edit") {
      const layer = get(settings).find(
        (layer) => layer.key === update.layer.key
      );
      const updatedLayer = { ...layer, ...update.layer };
      set(family(update.layer.key), updatedLayer);
      set(settings, (settings) =>
        settings.map((layer) => {
          if (layer.key !== update.layer.key) {
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
      set(family(update.layer.key), null);
      set(settings, (settings) =>
        settings.filter((layer) => layer.key !== update.layer.key)
      );
    }
  }
);

layers.onMount = (setLayers) => {
  setLayers({ action: "init" });
};

export default { edit, layers };
