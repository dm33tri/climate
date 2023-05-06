import { unzipSync } from "fflate";
import { NetCDFReader } from "@loaders.gl/netcdf";

export async function loadEra5Data(path: string) {
  const buffer = await fetch(`/api/cds/${path}`).then((data) =>
    data.arrayBuffer()
  );
  const file = unzipSync(new Uint8Array(buffer))["data.nc"];
  const data = new NetCDFReader(file);

  const variable = data.variables.find(
    (variable) => !["longitude", "latitude", "time"].includes(variable.name)
  );

  if (!variable) {
    return [];
  }

  const result: [number, number, number][] = [];

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

      if (value === fill || Number.isNaN(value)) {
        continue;
      }

      const x = longitude[i];
      const y = latitude[j];
      const trueValue = value * scale + offset;

      result.push([x, y, trueValue]);
    }
  }

  return result;
}
