import { atomWithStorage } from "jotai/utils";

export const projection = atomWithStorage<"mercator" | "globe">(
  "projection",
  "mercator"
);

export default { projection };
