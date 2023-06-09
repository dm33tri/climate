/**
 * convert array of [lon, lat, value] to binary grid
 */
export function gridBin(
  data: [number, number, number][],
  buffer: SharedArrayBuffer | ArrayBuffer,
  { resolution }: { resolution: number }
) {
  const view = new Float32Array(buffer, 0, data.length * 3);

  for (let i = 0; i < data.length; ++i) {
    const [lon, lat, value] = data[i];
    if (!value) {
      continue;
    }
    view[i * 3] = lon;
    view[i * 3 + 1] = lat;
    view[i * 3 + 2] = value;
  }

  return {
    buffer,
    resolution,
    count: data.length,
    type: "grid" as const,
  };
}
