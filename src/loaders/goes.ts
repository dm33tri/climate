import h5wasm, { Dataset } from "h5wasm";

import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getValue, getGeosProjection } from "~/loaders/utils";

const client = new S3Client({
  region: "us-east-1",
  signer: { sign: async (request) => request },
});

/**
 * Load GOES data from S3 bucket.
 */
export async function loadGoesData(path: string, initialVariable?: string) {
  const { FS } = await h5wasm.ready;

  const list = await client.send(
    new ListObjectsV2Command({
      Bucket: "noaa-goes16",
      Prefix: path,
    })
  );

  const filePath = list.Contents![0].Key!;
  const name = path.split("/").at(-1) as string;

  const data = await new Promise<ArrayBuffer>((resolve, reject) => {
    const makeFetch = (tries = 5) =>
      fetch(`https://noaa-goes16.s3.amazonaws.com/${filePath}`)
        .then((data) => data.arrayBuffer())
        .then((data) => resolve(data))
        .catch((error) => {
          if (tries > 0) {
            setTimeout(() => makeFetch(tries - 1), 5000);
          } else {
            reject(error);
          }
        });
    makeFetch();
  });

  FS.writeFile(name, new Uint8Array(data));

  const file = new h5wasm.File(name, "r");
  const result: [number, number, number][] = [];

  const variables: string[] = [];
  for (const [name, variable] of file.items()) {
    if (
      !variable ||
      !(typeof variable === "object") ||
      !("attrs" in variable)
    ) {
      continue;
    }
    if (
      variable.attrs["grid_mapping"] &&
      variable.attrs["grid_mapping"].value === "goes_imager_projection" &&
      "shape" in variable &&
      variable.shape.length === 2
    ) {
      variables.push(name as string);
    }
  }

  const variable =
    initialVariable && variables.includes(initialVariable)
      ? initialVariable
      : variables[0];
  const { value: X, offset: xOffset, scale: xScale } = getValue(file, "x");
  const { value: Y, offset: yOffset, scale: yScale } = getValue(file, "y");
  const { value: values, offset, scale, fill } = getValue(file, variable);
  const { projection, perspectivePointHeight } = getGeosProjection(file);
  let min = Infinity;
  let max = -Infinity;

  for (let i = 0; i < X.length; ++i) {
    for (let j = 0; j < Y.length; ++j) {
      const index = X.length * j + i;

      if (values[index] === fill) {
        continue;
      }

      const value = values[index] * scale + offset;

      if (Number.isNaN(value)) {
        continue;
      }
      if (!(values[index] === fill || Number.isNaN(value))) {
        if (value < min) {
          min = value;
        }
        if (value > max) {
          max = value;
        }
      }

      const x = (X[i] * xScale + xOffset) * perspectivePointHeight;
      const y = (Y[j] * yScale + yOffset) * perspectivePointHeight;
      const coords = projection.inverse([x, y]) as [number, number];
      if (Number.isNaN(coords[0]) || Number.isNaN(coords[1])) {
        continue;
      }

      result.push([...coords, value]);
    }
  }

  file.close();

  return { data: result, variables, min, max };
}
