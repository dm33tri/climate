import { atomWithStorage } from "jotai/utils";

export const projection = atomWithStorage<"mercator" | "globe">(
  "projection",
  "globe"
);

export default { projection };
