import h5wasm from "h5wasm";

import { getValue, getGeosProjection } from "./utils";

export async function loadEra5Data(path: string) {
  const { FS } = await h5wasm.ready;
  const data = await fetch(path).then((data) => data.arrayBuffer());
  const name = path.split("/").at(-1) as string;
  FS.writeFile(name, new Uint8Array(data));

  const file = new h5wasm.File(name, "r");
  const values: [number, number, number][] = [];

  const { value: X, offset: xOffset, scale: xScale } = getValue(file, "x");
  const { value: Y, offset: yOffset, scale: yScale } = getValue(file, "y");
  const { value, offset, scale, fill } = getValue(file, "LST");
  const { projection, perspectivePointHeight } = getGeosProjection(file);

  for (let i = 0; i < X.length; ++i) {
    for (let j = 0; j < Y.length; ++j) {
      const valueIndex = X.length * j + i;

      if (value[valueIndex] === fill) {
        continue;
      }

      const trueValue = value[valueIndex] * scale + offset;

      if (Number.isNaN(trueValue)) {
        continue;
      }

      const x = (X[i] * xScale + xOffset) * perspectivePointHeight;
      const y = (Y[j] * yScale + yOffset) * perspectivePointHeight;

      const coords = projection.inverse([x, y]) as [number, number];

      values.push([...coords, trueValue]);
    }
  }

  file.close();

  return values;
}
