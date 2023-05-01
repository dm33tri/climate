import { useMemo } from "react";
import { useAtomValue } from "jotai";
import DeckGL from "@deck.gl/react/typed";
import { _GlobeView, COORDINATE_SYSTEM } from "@deck.gl/core/typed";
import { BitmapLayer } from "@deck.gl/layers/typed";
import { TileLayer } from "@deck.gl/geo-layers/typed";

import * as layer from "~/atoms/layer";

const tileLayer = new TileLayer({
  data: [
    "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
    "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
    "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
  ],
  tileSize: 256,
  maxRequests: 20,
  minZoom: 0,
  maxZoom: 16,
  zoomOffset: 1,
  renderSubLayers: (props) => {
    const {
      boundingBox: [min, max],
    } = props.tile;

    return [
      new BitmapLayer(props, {
        data: undefined,
        image: props.data,
        bounds: [...min, ...max] as [number, number, number, number],
        _imageCoordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      }),
    ];
  },
});

const initialViewState = {
  longitude: 37.618423,
  latitude: 55.751244,
  zoom: 1,
};

const globeView = new _GlobeView({ id: "globe", controller: true });

export function Globe() {
  const layers = useAtomValue(layer.layers);

  const deckGlLayers = useMemo(
    () => layers.map(({ layer }) => layer).filter(Boolean),
    [layers]
  );

  return (
    <DeckGL
      views={[globeView]}
      initialViewState={initialViewState}
      style={{ position: "relative" }}
      layers={[tileLayer, ...deckGlLayers]}
      controller={true}
    />
  );
}
