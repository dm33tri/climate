import * as idb from "idb-keyval";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { load } from "~/worker";

export type DatasetParams = {
  key: string;
  path: string;
  payload?: Record<string, string | number>;
  source: "GOES-16" | "ERA5";
  type: "h3" | "grid";
  variable?: string;
};

export type DatasetResult = {
  key: string;
  buffer: ArrayBuffer | SharedArrayBuffer;
  count: number;
  min: number;
  max: number;
  date: Date;
  variables?: string[];
};

export type Dataset = DatasetParams & DatasetResult;

const MAX_BUFFER_SIZE = 256 * 1024 * 1024; // 256 MB

export const datasets = atomFamily(
  (params: DatasetParams) => {
    return atom(async () => {
      const cached = (await idb.get(params.key)) as Dataset;
      if (cached) {
        return cached;
      }
      const buffer = new SharedArrayBuffer(MAX_BUFFER_SIZE);
      const data = await load({ ...params, buffer });

      return data;
    });
  },
  (a, b) => a.key === b.key
);
