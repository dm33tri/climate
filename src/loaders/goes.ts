import h5wasm from "h5wasm";

import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getValue, getGeosProjection } from "~/loaders/utils";

const client = new S3Client({
  region: "us-east-1",
  signer: { sign: async (request) => request },
});

export async function loadGoesData(key: string) {
  const { FS } = await h5wasm.ready;

  const list = await client.send(
    new ListObjectsV2Command({
      Bucket: "noaa-goes16",
      Prefix: key,
    })
  );

  const path = list.Contents![0].Key!;
  const name = path.split("/").at(-1) as string;

  const data = await new Promise<ArrayBuffer>((resolve) => {
    const makeFetch = (tries = 5) =>
      fetch(`https://noaa-goes16.s3.amazonaws.com/${path}`)
        .then((data) => data.arrayBuffer())
        .then((data) => resolve(data))
        .catch(() => {
          if (tries > 0) {
            setTimeout(() => makeFetch(tries - 1), 5000);
          }
        });
    makeFetch();
  });

  FS.writeFile(name, new Uint8Array(data));

  const file = new h5wasm.File(name, "r");
  const result: [number, number, number][] = [];

  const [valueKey] = file.keys();

  const { value: X, offset: xOffset, scale: xScale } = getValue(file, "x");
  const { value: Y, offset: yOffset, scale: yScale } = getValue(file, "y");
  const { value: values, offset, scale, fill } = getValue(file, valueKey);
  const { projection, perspectivePointHeight } = getGeosProjection(file);

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

      const x = (X[i] * xScale + xOffset) * perspectivePointHeight;
      const y = (Y[j] * yScale + yOffset) * perspectivePointHeight;

      const coords = projection.inverse([x, y]) as [number, number];

      result.push([...coords, value]);
    }
  }

  file.close();

  return result;
}
