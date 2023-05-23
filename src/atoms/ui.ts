import { atomWithStorage } from "jotai/utils";

/**
 * Projection of the map
 */
export const projection = atomWithStorage<"mercator" | "globe">(
  "projection",
  "globe"
);

export default { projection };
