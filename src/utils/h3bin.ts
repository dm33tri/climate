import * as h3 from "h3-js";

/**
 * create a hexagonal grid from a list of points
 */
export function h3bin(
  data: [number, number, number][],
  buffer: SharedArrayBuffer | ArrayBuffer,
  { resolution }: { resolution: number }
) {
  const cells = new Map<string, [number, number]>();

  for (const [lon, lat, value] of data) {
    if (!value) {
      continue;
    }
    const index = h3.latLngToCell(lat, lon, resolution);
    const [sum, count] = cells.get(index) || [0, 0];
    cells.set(index, [sum + value, count + 1]);
  }

  const view = new DataView(buffer);

  const offset = Int32Array.BYTES_PER_ELEMENT;
  const step = offset * 2 + Float32Array.BYTES_PER_ELEMENT;

  let index = 0;
  for (const [cell, [sum, count]] of cells) {
    const [left, right] = h3.h3IndexToSplitLong(cell);
    view.setInt32(index * step, left);
    view.setInt32(index * step + offset, right);
    view.setFloat32(index * step + offset * 2, sum / count);
    ++index;
  }

  return { type: "h3" as const, resolution, buffer, count: index };
}
