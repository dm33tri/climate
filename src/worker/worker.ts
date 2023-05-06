import * as idb from "idb-keyval";
import { Request, Response } from "~/worker";
import { loadGoesData } from "~/loaders/goes";
import { h3bin } from "~/utils/h3bin";
import { loadEra5Data } from "~/loaders/era5";

export const elementSize = {
  h3: 2 * Int32Array.BYTES_PER_ELEMENT + Float32Array.BYTES_PER_ELEMENT,
  grid: 3 * Float32Array.BYTES_PER_ELEMENT,
};

function onLoad(response: Response) {
  postMessage(response);

  const length = response.count * elementSize[response.type];

  const destination = new Uint8ClampedArray(length);
  const source = new Uint8ClampedArray(response.buffer, 0, length);
  destination.set(source);

  idb.set(response.key, {
    ...response,
    buffer: destination.buffer,
  });
}

addEventListener("message", async ({ data: request }: { data: Request }) => {
  const { path, buffer, source, type } = request;

  const data: [number, number, number][] | null =
    (source === "ERA5" && (await loadEra5Data(path))) ||
    (source === "GOES-16" && (await loadGoesData(path))) ||
    null;

  const result = (data && type === "h3" && h3bin(data, 4, buffer)) || null;

  if (result) {
    onLoad({
      ...request,
      ...result,
      date: new Date(),
    });
  }
});
