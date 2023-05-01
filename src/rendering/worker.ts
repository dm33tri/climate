import { render } from "./shared";

addEventListener(
  "message",
  ({ data }: { data: { offscreenCanvas: OffscreenCanvas } }) => {
    const { offscreenCanvas: canvas } = data;
    const gl = canvas.getContext("webgl")!;
    render(gl);
  }
);
