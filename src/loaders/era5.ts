import { unzipSync } from "fflate";
import { NetCDFReader } from "@loaders.gl/netcdf";

/**
 * Load ERA5 data from the CDS API using proxy worker.
 */
export async function loadEra5Data(
  path: string,
  initialVariable?: string
): Promise<{
  data: [number, number, number][];
  variables: string[];
  min: number;
  max: number;
}> {
  const buffer = await fetch(`/api/cds/${path}`).then(async (response) => {
    if (response.ok) {
      return await response.arrayBuffer();
    } else {
      throw await response.json();
    }
  });
  const file = unzipSync(new Uint8Array(buffer))["data.nc"];
  const data = new NetCDFReader(file);

  const variables = data.variables.filter(
    (variable) => !["longitude", "latitude", "time"].includes(variable.name)
  );
  const variable =
    variables.find((variable) => variable.name === initialVariable) ||
    variables[0];
  const variableNames = variables.map((variable) => variable.name);

  if (!variable) {
    throw {};
  }

  const result: [number, number, number][] = [];
  let min = 50000;
  let max = -50000;

  const values = data.getDataVariable(variable.name);
  const longitude = data.getDataVariable("longitude");
  const latitude = data.getDataVariable("latitude");

  const { fill, offset, scale } = (
    variable.attributes as Record<string, number | string>[]
  ).reduce((acc, curr) => {
    if (curr.name === "_FillValue") {
      acc["fill"] = curr.value as number;
    } else if (curr.name === "add_offset") {
      acc["offset"] = curr.value as number;
    } else if (curr.name === "scale_factor") {
      acc["scale"] = curr.value as number;
    }
    return acc;
  }, {}) as { fill: number; offset: number; scale: number };

  for (let i = 0; i < longitude.length; ++i) {
    for (let j = 0; j < latitude.length; ++j) {
      const index = longitude.length * j + i;
      const value: number = values[index];

      const y = latitude[j];
      let x = longitude[i];
      if (x > 180) {
        x -= 360;
      }
      const trueValue =
        value === fill || Number.isNaN(value) ? 0 : value * scale + offset;

      if (trueValue && trueValue < min) {
        min = trueValue;
      }
      if (trueValue && trueValue > max) {
        max = trueValue;
      }

      result.push([x, y, trueValue]);
    }
  }

  return { data: result, variables: variableNames, min, max };
}
