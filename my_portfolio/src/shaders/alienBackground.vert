// Uniforms passed from JavaScript
uniform float uTime;   // Time for animation
uniform vec2 uMouse;   // Normalized mouse position (0-1)
uniform float uLayer;  // Index of the current background layer

// Varyings to pass data to the fragment shader
varying vec2 vUv;
varying float vDisplacement; // Will pass the calculated displacement value

// --- START: Simple Noise Functions (Pseudo-random) ---
// This is a common way to implement a simple hash-based noise in GLSL
// for procedural effects without needing complex noise algorithms.

// Hash function for pseudo-random numbers
float hash(float n) {
    return fract(sin(n) * 43758.5453);
}

// 2D noise function based on hashing, for smoother patterns
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    // Smooth interpolation (quintic curve)
    f = f * f * (3.0 - 2.0 * f);

    // Four corners of the grid
    float a = hash(i.x + i.y * 57.0);
    float b = hash(i.x + 1.0 + i.y * 57.0);
    float c = hash(i.x + (i.y + 1.0) * 57.0);
    float d = hash(i.x + 1.0 + (i.y + 1.0) * 57.0);

    // Bilinear interpolation
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
// --- END: Simple Noise Functions ---


void main() {
    vUv = uv; // Pass standard UVs to fragment shader

    // Create a copy of the original vertex position
    vec3 newPosition = position;

    // Scale UVs for noise input to control pattern density
    vec2 noiseCoord = uv * 5.0 + uTime * 0.1 + uLayer * 0.5; // Scale and animate noise coordinates
    
    // Calculate displacement using noise, influenced by time, mouse, and layer
    // The noise value is typically between 0 and 1. We map it to -1 to 1 for displacement.
    float displacement = noise(noiseCoord);
    displacement = displacement * 2.0 - 1.0; // Map to range [-1, 1]

    // Add mouse influence: stronger displacement near the mouse cursor
    // The closer to the mouse, the higher the multiplier
    float mouseDistance = distance(vUv, uMouse); // Distance from current UV to mouse UV
    float mouseInfluence = 1.0 - smoothstep(0.0, 0.5, mouseDistance); // Smoothly fall off influence
    displacement += mouseInfluence * 0.5; // Add mouse-influenced displacement

    // Further scale displacement based on layer and time for more dynamic effects
    displacement *= (0.5 + uLayer * 0.2 + sin(uTime * 0.5 + uLayer) * 0.1);

    // Apply displacement along the Z-axis (depth) to create a wavy effect
    // You can also displace along the vertex normal if you have normals
    newPosition.z += displacement * 0.5; // Adjust the multiplier for intensity

    vDisplacement = displacement; // Pass displacement to fragment shader for potential use (e.g., color variation)

    // Final vertex position transformation
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
