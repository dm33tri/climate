import dayjs, { Dayjs } from "dayjs";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const _datetime = atomWithStorage("date", "2023-04-01T00:00:00Z");

/**
 * Global date and time
 */
export const datetime = atom(
  (get) => dayjs(get(_datetime)),
  (_get, set, date: Dayjs) => set(_datetime, date.toISOString())
);
