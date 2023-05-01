import * as idb from "idb-keyval";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { load } from "~/worker";

export type DatasetParams = {
  key: string;
  source: "GOES-16" | "ERA5";
  type: "h3" | "grid";
};

export type Dataset = DatasetParams & {
  buffer: ArrayBuffer | SharedArrayBuffer;
  count: number;
  min: number;
  max: number;
  date: Date;
};

const MAX_BUFFER_SIZE = 256 * 1024 * 1024; // 256 MB

export const datasets = atomFamily(
  ({ key, type, source }: DatasetParams) => {
    return atom(async () => {
      const cached = (await idb.get(key)) as Dataset;
      if (cached) {
        return cached;
      }
      const buffer = new SharedArrayBuffer(MAX_BUFFER_SIZE);
      const data = await load({ key, buffer, type, source });
      // await idb.set(key, { ...data, });
      return data;
    });
  },
  (a, b) => a.key === b.key
);
