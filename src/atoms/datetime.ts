import dayjs, { Dayjs } from "dayjs";
import { atom } from "jotai";

export const datetime = atom<Dayjs>(dayjs("2023-04-01T00:00:00.000Z"));
