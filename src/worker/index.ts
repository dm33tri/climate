import { Dataset } from "~/atoms/dataset";

export type Request = {
  key: string;
  type: "h3" | "grid";
  source: "GOES-16" | "ERA5";
  buffer: SharedArrayBuffer | ArrayBuffer;
};

export type Response = Dataset;

const worker = new Worker(new URL("./worker.ts", import.meta.url), {
  type: "module",
});

const resolvers: Record<string, (response: Response) => void> = {};

worker.addEventListener("message", ({ data }: { data: Response }) => {
  resolvers[data.key] && resolvers[data.key](data);
});

export function load(request: Request): Promise<Response> {
  worker.postMessage(request);

  return new Promise((resolve) => {
    resolvers[request.key] = resolve;
  });
}
