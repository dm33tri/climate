import type { DatasetResult, DatasetParams } from "~/atoms/dataset";

export type Request = DatasetParams & {
  buffer: SharedArrayBuffer | ArrayBuffer;
};

export type Error = DatasetParams & { error: any };

export type Response = DatasetParams &
  DatasetResult & {
    buffer: SharedArrayBuffer | ArrayBuffer;
  };

const worker = new Worker(new URL("./worker.ts", import.meta.url), {
  type: "module",
});

const resolvers: Record<string, (response: Response) => void> = {};
const rejectors: Record<string, (response: Error) => void> = {};

worker.addEventListener("message", ({ data }: { data: Response | Error }) => {
  if ("error" in data) {
    rejectors[data.key] && rejectors[data.key](data);
  } else {
    resolvers[data.key] && resolvers[data.key](data);
  }
});

export function load(request: Request): Promise<Response> {
  worker.postMessage(request);

  return new Promise((resolve, reject) => {
    resolvers[request.key] = resolve;
    rejectors[request.key] = reject;
  });
}
