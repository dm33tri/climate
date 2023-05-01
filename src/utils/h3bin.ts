import * as h3 from "h3-js";

export function h3bin(
  data: [number, number, number][],
  resolution: number,
  buffer: SharedArrayBuffer | ArrayBuffer
) {
  let min = Infinity;
  let max = -Infinity;
  const cells = new Map<string, [number, number]>();

  for (const [lon, lat, value] of data) {
    const index = h3.latLngToCell(lat, lon, resolution);
    const [sum, count] = cells.get(index) || [0, 0];
    cells.set(index, [sum + value, count + 1]);
    if (min > value) min = value;
    if (max < value) max = value;
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

  return { type: "h3" as const, resolution, buffer, count: index, min, max };
}

export function* h3binIter({
  buffer,
  count,
}: {
  type: "h3";
  buffer: SharedArrayBuffer | ArrayBuffer;
  count: number;
}) {
  const view = new DataView(buffer);

  const offset = Int32Array.BYTES_PER_ELEMENT * 2;
  const step = offset + Float32Array.BYTES_PER_ELEMENT;

  for (let i = 0; i < count; ++i) {
    const left = view.getInt32(i * step);
    const right = view.getInt32(i * step + offset);
    const hex = h3.splitLongToH3Index(left, right);
    const value = view.getFloat32(i * step + offset * 2);
    yield { hex, value };
  }
}
