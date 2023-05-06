import type { DatasetResult, DatasetParams } from "~/atoms/dataset";

export type Request = DatasetParams & {
  buffer: SharedArrayBuffer | ArrayBuffer;
};

export type Response = DatasetParams &
  DatasetResult & {
    buffer: SharedArrayBuffer | ArrayBuffer;
  };

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
