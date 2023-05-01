uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uModel;

attribute vec2 aCoords;
attribute float aValue;

varying float vValue;

const float EARTH_RADIUS = 6370972.0; // meters
const float GLOBE_RADIUS = 256.0;

vec4 globeProjection(vec2 lonLat) {
  float lambda = radians(lonLat.x);
  float phi = radians(lonLat.y);
  float cosPhi = cos(phi);

  vec3 result = vec3(
    sin(lambda) * cosPhi,
    -cos(lambda) * cosPhi,
    sin(phi)
  ) * (1.0 / EARTH_RADIUS + 1.0);

  return vec4(result, 1.0);
}

void main(void) {
  vValue = aValue;

  gl_Position = uModel * globeProjection(aCoords);
}