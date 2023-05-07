import * as h3 from "h3-js";
import { Dayjs } from "dayjs";
import chroma from "chroma-js";
import { H3HexagonLayer } from "@deck.gl/geo-layers/typed";
import type { Layer as DeckGLLayer } from "@deck.gl/core/typed";

import { LayerSettings } from "~/atoms/layer";
import { Dataset, DatasetParams } from "~/atoms/dataset";
import { colors } from "~/utils/colors";

export function getParams(
  layer: Partial<LayerSettings>,
  date: Dayjs
): DatasetParams | undefined {
  if (!layer || !layer.product || !layer.type) {
    return;
  }
  const { product, type } = layer;
  const [source, variable] = product.split("/");
  const key =
    `${type}/${product}/${variable}` +
    `/${date.format("YYYY/MM/DD/HH:mm")}` +
    (layer.variable ? `/${layer.variable}` : "");

  if (source.startsWith("GOES-16")) {
    const year = `${date.year()}`;
    const day = `${date.diff(date.startOf("year"), "day")}`.padStart(3, "0");
    const hour = `${date.hour()}`.padStart(2, "0");
    const path = `${variable}/${year}/${day}/${hour}`;

    return {
      type,
      key,
      path,
      variable: layer.variable,
      source: "GOES-16" as const,
    };
  } else if (source.includes("era5")) {
    const year = `${date.year()}`;
    const month = `${date.month()}`.padStart(2, "0");
    const day = `${date.date()}`.padStart(2, "0");
    const time = date.format("HH:mm");
    const path = `${source}/${variable}/${year}/${month}/${day}/${time}`;

    return {
      type,
      key,
      path,
      variable: layer.variable,
      source: "ERA5" as const,
    };
  }
}

const layers = new Map<string, DeckGLLayer>();

export function getDeckGlLayer(
  dataset: Dataset,
  layerSettings: LayerSettings
): DeckGLLayer | undefined {
  const { buffer, count, min, max, key } = dataset;
  const { name, type, palette, opacity, visible } = layerSettings;
  const layerKey = `${key}/${palette}`;
  const path = palette.split(".");
  const scale = chroma.scale(colors[path[0]][path[1]]).domain([min, max]);
  if (!layers.has(layerKey)) {
    if (type === "h3") {
      const offset = Int32Array.BYTES_PER_ELEMENT;
      const step = offset * 2 + Float32Array.BYTES_PER_ELEMENT;
      const length = count * step;
      const view = new DataView(buffer, 0, length);
      const deckGlLayer = new H3HexagonLayer({
        id: name,
        filled: true,
        pickable: true,
        blend: true,
        opacity: opacity,
        visible: visible,
        data: { length: count, palette },
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

      layers.set(layerKey, deckGlLayer);
    }
  } else {
    const deckGlLayer = layers.get(layerKey)!.clone({ visible, opacity });
    layers.set(layerKey, deckGlLayer);
  }

  return layers.get(layerKey);
}
