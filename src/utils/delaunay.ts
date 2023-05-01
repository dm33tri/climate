import { Delaunay } from "d3-delaunay";
import { geoRotation, geoStereographic } from "d3-geo";
import { sqrt } from "./math.js";

export function delaunay(coords: [number, number][]) {
  if (coords.length < 2) {
    return [];
  }

  let pivot = 0;
  while (isNaN(coords[pivot][0] + coords[pivot][1]) && pivot < coords.length) {
    ++pivot;
  }

  const r = geoRotation(coords[pivot]),
    projection = geoStereographic()
      .translate([0, 0])
      .scale(1)
      .rotate(r.invert([180, 0]));
  const points: [number, number][] = coords.map(projection);

  const zeros: number[] = [];
  let max2 = 1;
  for (let i = 0, n = points.length; i < n; i++) {
    let m = points[i][0] ** 2 + points[i][1] ** 2;
    if (!isFinite(m) || m > 1e32) zeros.push(i);
    else if (m > max2) max2 = m;
  }

  const FAR = 1e6 * sqrt(max2);

  zeros.forEach((i) => (points[i] = [FAR, 0]));

  points.push([0, FAR]);
  points.push([-FAR, 0]);
  points.push([0, -FAR]);

  const delaunay = Delaunay.from(points);

  const { triangles, halfedges, inedges } = delaunay;
  const degenerate: number[] = [];
  for (let i = 0, l = halfedges.length; i < l; i++) {
    if (halfedges[i] < 0) {
      const j = i % 3 == 2 ? i - 2 : i + 1;
      const k = i % 3 == 0 ? i + 2 : i - 1;
      const a = halfedges[j];
      const b = halfedges[k];
      halfedges[a] = b;
      halfedges[b] = a;
      halfedges[j] = halfedges[k] = -1;
      triangles[i] = triangles[j] = triangles[k] = pivot;
      inedges[triangles[a]] = a % 3 == 0 ? a + 2 : a - 1;
      inedges[triangles[b]] = b % 3 == 0 ? b + 2 : b - 1;
      degenerate.push(Math.min(i, j, k));
      i += 2 - (i % 3);
    } else if (triangles[i] > points.length - 3 - 1) {
      triangles[i] = pivot;
    }
  }

  return delaunay;
}
