// SkillPanel3D.jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap'; // Import GSAP for animations
import { Text } from 'troika-three-text'; // Import Troika-Text for 3D text

// Define default radius and icon scale for the skill cluster
const DEFAULT_RADIUS = 2.5;
const DEFAULT_ICON_SCALE = 0.8;

const SkillPanel3D = ({ scene, skill, position, radius = DEFAULT_RADIUS, iconScale = DEFAULT_ICON_SCALE }) => {
  const groupRef = useRef(); // Ref for the main Three.js group containing all skill elements
  const textureLoader = new THREE.TextureLoader(); // Loader for image textures

  // Expanded icon data with more categories and icons
  // IMPORTANT: Ensure these image paths exist in your /public/skills/ directory
  const icons = {
    Frontend: [
      { name: 'React', src: '/skills/frontend/react.png' },
      { name: 'HTML5', src: '/skills/frontend/html.png' },
      { name: 'CSS3', src: '/skills/frontend/css.png' },
      { name: 'JavaScript', src: '/skills/frontend/javascript.png' },
      { name: 'TailwindCSS', src: '/skills/frontend/tailwindcss.png' },
      { name: 'Vue.js', src: '/skills/frontend/vue.png' },
      { name: 'Sass', src: '/skills/frontend/sass.png' },
      { name: 'Webpack', src: '/skills/frontend/webpack.png' },
    ],
    Backend: [
      { name: 'Node.js', src: '/skills/backend/node.png' },
      { name: 'Python', src: '/skills/backend/python.png' },
      { name: 'Express.js', src: '/skills/backend/express.png' },
      { name: 'MongoDB', src: '/skills/backend/mongodb.png' },
      { name: 'PostgreSQL', src: '/skills/backend/postgresql.png' },
      { name: 'Firebase', src: '/skills/backend/firebase.png' },
      { name: 'GraphQL', src: '/skills/backend/graphql.png' },
      { name: 'REST APIs', src: '/skills/backend/rest.png' }, // Generic icon
    ],
    'AI/ML': [ // Changed 'AI' to 'AI/ML' to match section name
      { name: 'Python', src: '/skills/ai/python.png' },
      { name: 'TensorFlow', src: '/skills/ai/tensorflow.png' },
      { name: 'PyTorch', src: '/skills/ai/pytorch.png' },
      { name: 'OpenAI API', src: '/skills/ai/openai.png' },
      { name: 'Scikit-learn', src: '/skills/ai/scikitlearn.png' },
      { name: 'NLP', src: '/skills/ai/nlp.png' }, // Generic icon
      { name: 'Computer Vision', src: '/skills/ai/computer-vision.png' }, // Generic icon
    ],
    'Game Dev': [ // Changed 'Game Dev' to match section name
      { name: 'Unity', src: '/skills/gamedev/unity.png' },
      { name: 'C#', src: '/skills/gamedev/csharp.png' },
      { name: 'Blender', src: '/skills/gamedev/blender.png' },
      { name: 'Unreal Engine', src: '/skills/gamedev/unreal.png' },
    ],
    DevOps: [ // Changed 'DevOps' to match section name
      { name: 'AWS', src: '/skills/cloud/aws.png' },
      { name: 'Docker', src: '/skills/cloud/docker.png' },
      { name: 'Kubernetes', src: '/skills/cloud/kubernetes.png' },
      { name: 'Azure', src: '/skills/cloud/azure.png' },
      { name: 'CI/CD', src: '/skills/cloud/cicd.png' }, // Generic icon
    ],
    Design: [ // Changed 'Design' to match section name
      { name: 'Figma', src: '/skills/design/figma.png' },
      { name: 'Photoshop', src: '/skills/design/photoshop.png' },
      { name: 'Illustrator', src: '/skills/design/illustrator.png' },
      { name: 'UI/UX', src: '/skills/design/uiux.png' }, // Generic icon
    ],
    // Add more categories as needed to match your section names
    // If a section name doesn't have a direct match, it will display nothing.
  };

  useEffect(() => {
    if (!scene || !skill || !icons[skill]) {
      // Clean up any existing group if skill is null or not found
      if (groupRef.current) {
        scene.remove(groupRef.current);
        groupRef.current.children.forEach(child => {
          if (child.material) child.material.dispose();
          if (child.geometry) child.geometry.dispose();
          if (child.dispose) child.dispose(); // For Troika-Text
        });
        groupRef.current = null;
      }
      return;
    }

    // Remove previous skill group if it exists before creating a new one
    if (groupRef.current) {
      scene.remove(groupRef.current);
      groupRef.current.children.forEach(child => {
        if (child.material) child.material.dispose();
        if (child.geometry) child.geometry.dispose();
        if (child.dispose) child.dispose(); // For Troika-Text
      });
      groupRef.current = null;
    }

    const group = new THREE.Group();
    groupRef.current = group;

    // Add a central glowing core
    const coreGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x00eaff, // Electric blue
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending, // For glow effect
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const skillIcons = icons[skill];
    const numIcons = skillIcons.length;
    const angleStep = (Math.PI * 2) / numIcons; // Angle for circular arrangement

    skillIcons.forEach((icon, i) => {
      // Load texture for the sprite icon
      const texture = textureLoader.load(icon.src,
        // On load callback
        (loadedTexture) => {
          const mat = new THREE.SpriteMaterial({ map: loadedTexture, transparent: true, opacity: 0 }); // Start transparent for animation
          const sprite = new THREE.Sprite(mat);

          // Position icons in a circle around the group's center
          // Add a slight Z variation to give more depth
          const x = radius * Math.cos(i * angleStep);
          const y = radius * Math.sin(i * angleStep);
          const z = (Math.random() - 0.5) * 0.5; // Random Z offset

          sprite.position.set(x, y, z);
          sprite.scale.set(iconScale, iconScale, 1); // Maintain aspect ratio for sprites
          group.add(sprite);

          // GSAP pop-in animation for the sprite
          gsap.fromTo(sprite.material, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: i * 0.1 });
          gsap.fromTo(sprite.scale, { x: 0.1, y: 0.1 }, { x: iconScale, y: iconScale, duration: 0.8, ease: "back.out(1.7)", delay: i * 0.1 });

          // Add 3D Text Label using Troika-Text
          const text = new Text();
          text.text = icon.name;
          text.font = '/fonts/RobotoMono-Regular.ttf'; // Path to a .ttf font file in your public folder
          text.fontSize = 0.15;
          text.color = 0x00eaff; // Electric blue text color
          text.anchorX = 'center';
          text.anchorY = 'top';
          text.position.set(x, y - iconScale / 2 - 0.1, z); // Position below the sprite
          text.sync(); // Important: call sync to render the text
          group.add(text);

          // GSAP pop-in animation for the text
          gsap.fromTo(text, { opacity: 0, y: text.position.y + 0.2 }, { opacity: 1, y: text.position.y, duration: 0.8, delay: i * 0.1 + 0.2 });
        },
        // On progress callback
        undefined,
        // On error callback
        (err) => {
          console.error('Error loading texture:', icon.src, err);
        }
      );
    });

    group.position.set(...position); // Set the position of the entire skill group
    scene.add(group);

    // Continuous floating/rotating animation for the whole group
    let animationFrameId;
    const animateGroup = () => {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.005; // Gentle rotation
        // Subtle floating motion
        groupRef.current.position.y = position[1] + Math.sin(performance.now() * 0.001) * 0.2;
      }
      animationFrameId = requestAnimationFrame(animateGroup);
    };
    animateGroup();

    // Cleanup function
    return () => {
      if (groupRef.current) {
        cancelAnimationFrame(animationFrameId); // Stop the animation loop
        scene.remove(groupRef.current);
        groupRef.current.children.forEach((child) => {
          // Dispose of materials and geometries
          if (child.material) child.material.dispose();
          if (child.geometry) child.geometry.dispose();
          // For Troika-Text objects, call dispose()
          if (child.dispose && typeof child.dispose === 'function') {
            child.dispose();
          }
        });
        groupRef.current = null; // Clear the ref
      }
    };
  }, [scene, skill, position, radius, iconScale]); // Depend on props that affect the render

  return null; // This component doesn't render any DOM elements itself
};

export default SkillPanel3D;
