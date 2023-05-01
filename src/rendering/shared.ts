/// <reference types="vite-plugin-glsl/ext" />

import h5wasm, { Dataset } from "h5wasm";
import { delaunay } from "../utils/delaunay";
import { Matrix4 } from "@math.gl/core";

import vertex from "../shaders/heatmap/vertex.glsl";
import fragment from "../shaders/heatmap/fragment.glsl";

const listPromise = fetch("/list.txt")
  .then((data) => data.text())
  .then((data) => data.split("\n").filter(Boolean));

export async function loadData(variable: string) {
  const [list, { FS }] = await Promise.all([listPromise, h5wasm.ready]);
  const coords: [number, number][] = [];
  const values: number[] = [];

  for (const item of list) {
    const name = item.split("/").at(-1) as string;
    const data = await fetch(item).then((data) => data.arrayBuffer());
    FS.writeFile(name, new Uint8Array(data));
    const file = new h5wasm.File(name, "r");

    const longitudes = (
      file.get("mod04/Geolocation Fields/Longitude") as Dataset
    ).value as Float32Array;

    const latitudes = (file.get("mod04/Geolocation Fields/Latitude") as Dataset)
      .value as Float32Array;

    const dataset = file.get(`mod04/Data Fields/${variable}`) as Dataset;

    const fillValue = dataset.attrs["_FillValue"].value as number;
    const value = dataset.value as Int16Array;

    for (let i = 0; i < value.length; ++i) {
      if (value[i] && value[i] !== fillValue) {
        coords.push([longitudes[i], latitudes[i]]);
        values.push(value[i]);
      }
    }

    file.close();
  }

  return { coords, values };
}

export async function render(gl: WebGLRenderingContext) {
  const { coords, values } = await loadData("Aerosol_Cloud_Fraction_Land");
  const { triangles }: { triangles: Uint32Array } = delaunay(coords);

  const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vertexShader, vertex);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fragmentShader, fragment);
  gl.compileShader(fragmentShader);

  const program = gl.createProgram()!;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  // // prettier-ignore
  const viewModel = new Matrix4().rotateX(Math.PI / 2 + Math.PI / 4);

  const uModel = gl.getUniformLocation(program, "uModel");
  const aCoords = gl.getAttribLocation(program, "aCoords");
  const coordsBufferData = new Float32Array(triangles.length * 2);
  const coordsBuffer = gl.createBuffer();

  for (let i = 0; i < triangles.length; ++i) {
    coordsBufferData[i * 2] = coords[triangles[i]][0];
    coordsBufferData[i * 2 + 1] = coords[triangles[i]][1];
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, coordsBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, coordsBufferData, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(aCoords);
  gl.vertexAttribPointer(aCoords, 2, gl.FLOAT, false, 0, 0);

  const aValue = gl.getAttribLocation(program, "aValue");
  const valuesBufferData = new Float32Array(triangles.length);
  const valuesBuffer = gl.createBuffer();
  for (let i = 0; i < triangles.length; ++i) {
    valuesBufferData[i] = values[triangles[i]];
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, valuesBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, valuesBufferData, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(aValue);
  gl.vertexAttribPointer(aValue, 1, gl.FLOAT, false, 0, 0);

  gl.uniformMatrix4fv(uModel, false, viewModel);

  console.warn("Draw");
  gl.drawArrays(gl.TRIANGLES, 0, triangles.length);
}
