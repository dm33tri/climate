import * as h3 from "h3-js";
import chroma from "chroma-js";
import { Dayjs } from "dayjs";
import { GridLayer, ContourLayer } from "@deck.gl/aggregation-layers/typed";
import { H3HexagonLayer } from "@deck.gl/geo-layers/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { Layer as DeckGLLayer } from "@deck.gl/core/typed";

import { LayerSettings } from "~/atoms/layer";
import { Dataset, DatasetParams } from "~/atoms/dataset";
import { colors } from "~/utils/colors";

/**
 * calculate parameters to pass to the loader
 */
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

/**
 * instantiate a deck.gl layer to render a dataset
 */
export function getDeckGlLayer(
  dataset: Dataset,
  layerSettings: LayerSettings
): DeckGLLayer | undefined {
  const { palette, opacity, visible } = layerSettings;
  const key = `${dataset.key}/${layerSettings.key}/${palette}`;
  const path = palette.split(".");
  const colorScale = colors[path[0]][path[1]];
  const { min, max } = dataset;
  const scale = chroma.scale(colorScale).domain([min, max]);

  if (!layers.has(key)) {
    if (dataset.type === "h3") {
      const { buffer, count } = dataset;
      const offset = Int32Array.BYTES_PER_ELEMENT;
      const step = offset * 2 + Float32Array.BYTES_PER_ELEMENT;
      const length = count * step;
      const view = new DataView(buffer, 0, length);

      function* getData() {
        for (let i = 0; i < count; ++i) {
          const left = view.getInt32(step * i);
          const right = view.getInt32(step * i + offset);
          const value = view.getFloat32(step * i + offset * 2);
          yield { hexagon: h3.splitLongToH3Index(left, right), value };
        }
      }

      const data = [...getData()];

      const deckGlLayer = new H3HexagonLayer({
        id: key,
        filled: true,
        pickable: true,
        blend: true,
        opacity: opacity,
        visible: visible,
        data: data,
        wireframe: false,
        getHexagon: (item: { hexagon: string }) => {
          return item.hexagon;
        },
        getFillColor: (item: { value: number }) => {
          return scale(item.value).rgb();
        },
      });

      layers.set(key, deckGlLayer);
    } else if (dataset.type === "grid") {
      const { buffer, count } = dataset;
      const view = new Float32Array(buffer, 0, count * 3);
      const colorRange = scale.colors(16, null).map((color) => color.rgb());

      const deckGlLayer = new GridLayer({
        id: key,
        cellSize: 40000,
        pickable: true,
        extruded: false,
        opacity: opacity,
        visible: visible,
        colorRange: colorRange as any,
        colorDomain: [min, max],
        colorAggregation: "MEAN",
        data: { length: count },
        gpuAggregation: true,
        getPosition: (_, { index }) => {
          return [view[index * 3], view[index * 3 + 1]];
        },
        getColorWeight: (_, { index }) => {
          return view[index * 3 + 2];
        },
      });

      layers.set(key, deckGlLayer);
    } else if (dataset.type === "contour") {
      const deckGlLayer = new GeoJsonLayer({
        id: key,
        data: dataset.features,
        getLineWidth: 2,
        getLineColor: (line: any) => {
          const value: number = line.properties.value;
          return scale(value).rgb();
        },
        lineWidthUnits: "pixels",
        filled: true,
        stroked: true,
        pickable: false,
        wrapLongitude: true,
      });

      layers.set(key, deckGlLayer);
    }
  } else {
    const deckGlLayer = layers.get(key)!.clone({ visible, opacity });
    layers.set(key, deckGlLayer);
  }

  return layers.get(key);
}
