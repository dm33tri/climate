import * as idb from "idb-keyval";
import { Request, Response, Error } from "~/worker";
import { loadGoesData } from "~/loaders/goes";
import { h3bin } from "~/utils/h3bin";
import { loadEra5Data } from "~/loaders/era5";
import { gridBin } from "~/utils/grid";
import { contour } from "~/utils/contour";

export const elementSize = {
  h3: 2 * Int32Array.BYTES_PER_ELEMENT + Float32Array.BYTES_PER_ELEMENT,
  grid: 3 * Float32Array.BYTES_PER_ELEMENT,
  contour: 2 * Float32Array.BYTES_PER_ELEMENT,
};

function onLoad(response: Response | Error) {
  postMessage(response);

  if ("error" in response) {
    return;
  }

  if (response.type === "h3" || response.type === "grid") {
    const length = response.count * elementSize[response.type];

    const destination = new Uint8ClampedArray(length);
    const source = new Uint8ClampedArray(response.buffer, 0, length);
    destination.set(source);

    idb.set(response.key, {
      ...response,
      buffer: destination.buffer,
    });
  } else {
    idb.set(response.key, { ...response, buffer: undefined });
  }
}

addEventListener("message", async ({ data: request }: { data: Request }) => {
  if (!self.document) {
    // @ts-ignore
    self.document = { currentScript: {} }; // hack for worker
  }

  const { path, buffer, source, type, variable } = request;

  try {
    let data;
    switch (source) {
      case "ERA5":
        data = await loadEra5Data(path, variable);
        break;
      case "GOES-16":
        data = await loadGoesData(path, variable);
        break;
      default:
        data = null;
    }

    if (data == null) {
      return onLoad({ ...request, error: "Data error" });
    }

    const { min, max } = data;

    let result;

    switch (type) {
      case "h3":
        result = h3bin(data.data, buffer, { resolution: 4 });
        break;
      case "grid":
        result = gridBin(data.data, buffer, { resolution: 1000 });
        break;
      case "contour":
        result = contour(data.data, { min, max, breaks: 8 });
        break;
      default:
        result = null;
    }

    if (result) {
      onLoad({
        ...result,
        ...request,
        min,
        max,
        date: new Date(),
        variables: data.variables,
      } as Response);
    }
  } catch (error) {
    onLoad({ ...request, error });
  }
});
