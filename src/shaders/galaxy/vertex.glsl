attribute float aScale;
attribute vec3 aRandomness;

uniform float uSize;
uniform float uTime;

varying vec3 vColor;

void main() {
    /*
    * Position
    */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    //spin
    float angle = atan(modelPosition.x, modelPosition.z);
    float distance = length(modelPosition.xz);
    float angleOffset = (1.0 / distance) * uTime * 0.75;
    angle += angleOffset;
    modelPosition.x = sin(angle) * distance * 0.75;
    modelPosition.z = cos(angle) * distance * 0.75;

    // randomness 
    modelPosition.xyz += aRandomness;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    /*
    * Size
    */
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / -viewPosition.z);

    vColor = color;
}