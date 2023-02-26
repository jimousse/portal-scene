uniform float uTime;
varying vec2 vUv;

float random(vec2 st) {
  vec2 pt1 = vec2(12.9898, 123.233);
  float dotProduct = dot(pt1, st.xy);
  float bigNum = 43758.5453123;
  return fract(sin(dotProduct) * bigNum);
}

void main() {
  vec3 noise = vec3(random(vUv * uTime));
  gl_FragColor = vec4(noise, 1.0);
}