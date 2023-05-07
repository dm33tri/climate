import * as idb from "idb-keyval";
import { Request, Response, Error } from "~/worker";
import { loadGoesData } from "~/loaders/goes";
import { h3bin } from "~/utils/h3bin";
import { loadEra5Data } from "~/loaders/era5";
import { gridBin } from "~/utils/grid";

export const elementSize = {
  h3: 2 * Int32Array.BYTES_PER_ELEMENT + Float32Array.BYTES_PER_ELEMENT,
  grid: 3 * Float32Array.BYTES_PER_ELEMENT,
};

function onLoad(response: Response | Error) {
  postMessage(response);

  if ("error" in response) {
    return;
  }

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
  if (!self.document) {
    // @ts-ignore
    self.document = { currentScript: {} }; // hack for worker
  }

  const { path, buffer, source, type, variable } = request;

  try {
    const data =
      (source === "ERA5" && (await loadEra5Data(path, variable))) ||
      (source === "GOES-16" && (await loadGoesData(path, variable))) ||
      null;

    if (data == null) {
      return onLoad({ ...request, error: "Data error" });
    }

    const result =
      (data && type === "h3" && h3bin(data.data, 4, buffer)) ||
      (data && type === "grid" && gridBin(data.data, 1000, buffer)) ||
      null;

    if (result) {
      onLoad({
        ...request,
        ...result,
        variables: data.variables,
        date: new Date(),
      });
    }
  } catch (error) {
    onLoad({ ...request, error });
  }
});
