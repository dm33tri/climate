import * as h3 from "h3-js";
import dayjs from "dayjs";
import chroma from "chroma-js";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { H3HexagonLayer } from "@deck.gl/geo-layers/typed";
import type { Layer as DeckGLLayer } from "@deck.gl/core/typed";

import { Dataset, datasets } from "~/atoms/dataset";
import { datetime } from "~/atoms/datetime";

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
  layer: Pick<LayerSettings, "name">;
};

export type Update = Add | Edit | Remove;

function getDeckGlLayer(
  dataset: Dataset,
  layerSettings: LayerSettings
): DeckGLLayer | undefined {
  const { buffer, count, min, max } = dataset;
  const { palette, type, opacity, name } = layerSettings;
  const scale = chroma.scale(palette).domain([min, max]);

  let deckGlLayer: DeckGLLayer | undefined = undefined;

  if (type === "h3") {
    const offset = Int32Array.BYTES_PER_ELEMENT;
    const step = offset * 2 + Float32Array.BYTES_PER_ELEMENT;
    const length = count * step;
    const view = new DataView(buffer, 0, length);
    deckGlLayer = new H3HexagonLayer({
      id: name,
      filled: true,
      pickable: true,
      blend: true,
      opacity: opacity,
      data: { length: count },
      wireframe: false,
      getHexagon: (_, { index }) => {
        const left = view.getInt32(step * index);
        const right = view.getInt32(step * index + offset);
        return h3.splitLongToH3Index(left, right);
      },
      getFillColor: (_, { index }) => {
        const value = view.getFloat32(step * index + offset * 2);
        return [...scale(value).rgb(), 255];
      },
    });
  }

  return deckGlLayer;
}

const names = atom<string[]>([]);

const family = atomFamily((name: Layer["name"]) => atom<Layer | null>(null));

export const edit = atom<Partial<LayerSettings> | null>(null);

function getParams(layer: LayerSettings, datetime: Date) {
  const product = layer.product;
  const date = dayjs(datetime);

  if (product.startsWith("GOES-16")) {
    const [source, dataset] = product.split("/");
    const year = `${date.year()}`;
    const day = `${date.diff(date.startOf("year"), "day")}`.padStart(3, "0");
    const hour = `${date.hour()}`.padStart(2, "0");

    return {
      type: layer.type,
      key: `${dataset}/${year}/${day}/${hour}`,
      source: source as "GOES-16",
    };
  }
}

export const layers = atom(
  (get) =>
    get(names)
      .map((name) => get(family(name)))
      .filter(Boolean) as Layer[],
  (get, set, update: Update) => {
    if (update.action === "add") {
      const layer: Layer = { ...update.layer, state: "requested" };
      const dt = get(datetime);
      const params = getParams(layer, dt);

      set(family(layer.name), layer);
      set(names, (names) => [...names, layer.name]);

      if (params) {
        get(datasets(params)).then((dataset) => {
          set(family(layer.name), {
            ...layer,
            state: "loaded",
            layer: getDeckGlLayer(dataset, layer),
          });
        });
      }

      return layer;
    }
  }
);

export default { edit, layers };
