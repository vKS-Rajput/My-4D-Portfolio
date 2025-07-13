// Uniforms passed from JavaScript (same as vertex shader)
uniform float uTime;
uniform vec2 uMouse;
uniform float uLayer;

// Varyings received from the vertex shader
varying vec2 vUv;
varying float vDisplacement; // Now used for color influence

// --- START: Noise function (copied for self-contained fragment shader, though not strictly needed if only vDisplacement is used) ---
// It's good practice to have noise functions available if you want to generate
// additional patterns directly in the fragment shader.
float hash(float n) {
    return fract(sin(n) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i.x + i.y * 57.0);
    float b = hash(i.x + 1.0 + i.y * 57.0);
    float c = hash(i.x + (i.y + 1.0) * 57.0);
    float d = hash(i.x + 1.0 + (i.y + 1.0) * 57.0);
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
// --- END: Noise function ---


void main() {
    // Base UV coordinates
    vec2 uv = vUv;

    // --- Enhanced Distortion / Movement ---
    // Add subtle, layer-specific distortions to UVs
    float distortionStrength = 0.03 + 0.02 * uLayer;
    uv.x += sin(uv.y * 12.0 + uTime * (0.4 + 0.07 * uLayer) + uMouse.x * 2.0) * distortionStrength;
    uv.y += cos(uv.x * 12.0 + uTime * (0.5 + 0.07 * uLayer) + uMouse.y * 2.0) * distortionStrength;

    // --- Dynamic Color Generation ---
    // Combine multiple sine waves for complex, evolving colors
    float r = 0.5 + 0.5 * sin(uv.x * 15.0 + uTime * 0.8 + vDisplacement * 2.0 + uLayer * 0.5);
    float g = 0.5 + 0.5 * sin(uv.y * 15.0 + uTime * 0.9 + vDisplacement * 2.0 + uLayer * 0.5 + 1.5);
    float b = 0.5 + 0.5 * sin((uv.x + uv.y) * 10.0 + uTime * 0.7 + vDisplacement * 2.0 + uLayer * 0.5 + 3.0);

    // Further influence colors with a noise pattern for organic variation
    vec2 colorNoiseCoord = uv * 3.0 + uTime * 0.2 + uLayer * 0.3;
    float colorNoise = noise(colorNoiseCoord);
    r += colorNoise * 0.2;
    g += colorNoise * 0.15;
    b += colorNoise * 0.25;

    // Clamp colors to valid range [0, 1]
    vec3 finalColor = vec3(r, g, b);
    finalColor = clamp(finalColor, 0.0, 1.0);

    // --- Advanced Alpha / Transparency ---
    // Base alpha, varying slightly by layer
    float baseAlpha = 0.1 + 0.05 * uLayer;

    // Add a subtle time-based flicker/glitch to alpha
    float flicker = noise(vec2(uTime * 10.0, uLayer * 10.0));
    flicker = smoothstep(0.4, 0.6, flicker); // Create sharper on/off for flicker
    float alpha = baseAlpha + flicker * 0.1; // Add flicker to alpha

    // Make alpha slightly influenced by displacement (e.g., more transparent where displaced)
    alpha -= abs(vDisplacement) * 0.05;

    // Ensure alpha stays within bounds
    alpha = clamp(alpha, 0.0, 0.5); // Max alpha to keep it subtle

    // Final fragment color
    gl_FragColor = vec4(finalColor, alpha);
}
