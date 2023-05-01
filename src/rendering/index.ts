import { render } from "./shared";

export function attachCanvas(canvas: HTMLCanvasElement) {
  const supportsOffscreen = "transferControlToOffscreen" in canvas;

  if (false && supportsOffscreen) {
    const offscreenCanvas = canvas.transferControlToOffscreen();
    const worker = new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module",
    });

    worker.postMessage({ offscreenCanvas }, [offscreenCanvas]);
  } else {
    const gl = canvas.getContext("webgl")!;
    render(gl);
  }
}
