varying vec3 vColor;

void main() {
    // disc pattern
    // float strength = 1.0 - distance(gl_PointCoord, vec2(0.5));
    // strength = step(0.5, strength);

    // diffuse pattern
    // float strength = 1.0 - distance(gl_PointCoord, vec2(0.5)) * 2.0;

    //light point pattern
    float strength = 1.0 - distance(gl_PointCoord, vec2(0.5));
    strength = pow(strength, 5.0);

    // Final color
    vec3 color = mix(vec3(0.0), vColor, strength);
    gl_FragColor = vec4(color, 1.0);
}