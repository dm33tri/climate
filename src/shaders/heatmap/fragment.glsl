precision mediump float;

varying float vValue;

void main(void) {
  vec3 color = mix(
    vec3(0.0, 1.0, 0.0),
    vec3(1.0, 0.0, 0.0),
    vValue / 1000.0
  );
  gl_FragColor = vec4(color, 0.5);
}