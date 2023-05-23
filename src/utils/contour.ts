import { geojsonToBinary } from "@loaders.gl/gis";
import * as turf from "@turf/turf";

/**
 * Create isolines from a grid of points.
 */
export function contour(
  data: [number, number, number][],
  { min, max, breaks }: { min: number; max: number; breaks: number }
) {
  const points = [];
  for (const point of data) {
    points.push(turf.point([point[0], point[1]], { value: point[2] }));
  }

  const bands = Array.from(
    { length: breaks },
    (_, i) => min + (max - min) * (i / 10)
  );

  const fc = turf.featureCollection(points);

  const isolines = turf.isolines(fc, bands, {
    zProperty: "value",
  });

  const features = geojsonToBinary(isolines.features, {
    PositionDataType: Float32Array,
    fixRingWinding: true,
  });

  return { features };
}
