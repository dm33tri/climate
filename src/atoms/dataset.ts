import * as idb from "idb-keyval";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { load } from "~/worker";
import { BinaryFeatures } from "@loaders.gl/schema";

/**
 * Dataset parameters to load
 */
export type DatasetParams = {
  key: string; // unique key
  path: string; // path to the dataset
  payload?: Record<string, string | number>; // payload to pass to the loader
  source: "GOES-16" | "ERA5"; // source of the dataset
  type: "h3" | "grid" | "contour" | "raw"; // layer type
  variable?: string; // variable of the selected product
};

export type DatasetResult = {
  key: string; // unique key
  min: number; // min value
  max: number; // max value
  date: Date; // date
  variables?: string[]; // available variables
  availableDates?: Date[]; // available dates
} & (
  | {
      type: "h3" | "grid" | "raw"; // layer type
      key: string; // unique key
      count: number; // number of pixels
      buffer: ArrayBuffer | SharedArrayBuffer; // buffer to store the data
    }
  | {
      type: "contour"; // layer type
      features: BinaryFeatures; // flat GeoJSON features
    }
);

/**
 * Dataset instance
 */
export type Dataset = DatasetParams & DatasetResult;

const MAX_BUFFER_SIZE = 256 * 1024 * 1024; // 256 MB

/**
 * Dataset atom family (dictionary)
 */
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
