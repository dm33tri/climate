import { atom } from "jotai";
import { atomFamily, atomWithStorage, loadable } from "jotai/utils";
import type { Layer as DeckGLLayer } from "@deck.gl/core/typed";

import { Dataset, datasets } from "~/atoms/dataset";
import { datetime } from "~/atoms/datetime";
import { getDeckGlLayer, getParams } from "~/utils/layer";

/**
 * Layer settings
 */
export type LayerSettings = {
  key: string; // unique key
  name: string; // display name
  product: string; // product name
  type: "h3" | "grid" | "contour" | "raw"; // layer type
  palette: string; // palette name
  opacity: number; // opacity
  visible: boolean; // visibility

  variable?: string; // variable of the selected product
  year?: string; // override global year
  month?: string; // override global month
  day?: string; // override global day
  time?: string; // override global time
};

/**
 * Layer instance
 */
export type Layer = LayerSettings & {
  state: "loading" | "loaded" | "error";
  layer?: DeckGLLayer;
  dataset?: Dataset;
};

/**
 * Partial layer settings
 */
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

/**
 * Layer settings stored in local storage
 */
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

/**
 * Layer settings dictionary
 * @param name - layer name
 * @returns layer settings
 */
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

/**
 * Layer settings being edited or created
 */
export const edit = atom<Partial<LayerSettings> | null>(null);

/**
 * Layer settings array atom
 */
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
