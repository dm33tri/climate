import proj4 from "proj4";
import type { Dataset, File } from "h5wasm";

export function getValue(file: File, path: string) {
  const dataset = file.get(path) as Dataset;
  const [offset] = dataset.attrs["add_offset"]
    ? (dataset.attrs["add_offset"].value as Float32Array)
    : [0];
  const [scale] = dataset.attrs["scale_factor"]
    ? (dataset.attrs["scale_factor"].value as Float32Array)
    : [1];
  const value = dataset.value as Float32Array;

  if (!dataset.attrs["_FillValue"]) {
    return { offset, scale, value };
  }

  const [fill] = dataset.attrs["_FillValue"].value as Float32Array;

  return { offset, scale, fill, value };
}

export function getGeosProjection(file: File) {
  const goesImagerProjection = file.get("goes_imager_projection") as Dataset;
  const [longitudeOfProjectionOrigin] = goesImagerProjection.attrs[
    "longitude_of_projection_origin"
  ].value as Float32Array;
  const [perspectivePointHeight] = goesImagerProjection.attrs[
    "perspective_point_height"
  ].value as Float32Array;
  const [semiMinorAxis] = goesImagerProjection.attrs["semi_minor_axis"]
    .value as Float32Array;
  const [semiMajorAxis] = goesImagerProjection.attrs["semi_major_axis"]
    .value as Float32Array;
  const sweepAngleAxis = goesImagerProjection.attrs["sweep_angle_axis"]
    .value as string;

  const projection = proj4(
    `+proj=geos +sweep=${sweepAngleAxis} +lon_0=${longitudeOfProjectionOrigin} +h=${perspectivePointHeight} +a=${semiMajorAxis} +b=${semiMinorAxis}`
  );

  return {
    projection,
    perspectivePointHeight,
    semiMajorAxis,
    semiMinorAxis,
    longitudeOfProjectionOrigin,
    sweepAngleAxis,
  };
}
