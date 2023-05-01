import { Request, Response } from "~/worker";
import { loadGoesData } from "~/loaders/goes";
import { h3bin } from "~/utils/h3bin";

function onLoad(response: Response) {
  postMessage(response);
}

addEventListener("message", async (message: { data: Request }) => {
  const { key, type, source, buffer } = message.data;
  if (source === "ERA5") {
  } else if (source === "GOES-16") {
    const data = await loadGoesData(key);
    if (type === "h3") {
      const result = h3bin(data, 5, buffer);

      onLoad({
        key,
        source,
        ...result,
        date: new Date(),
      });
    }
  }
});
