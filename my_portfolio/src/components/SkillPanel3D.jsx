// SkillPanel3D.jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SkillPanel3D = ({ scene, skill, position }) => {
  const groupRef = useRef();
  const textureLoader = new THREE.TextureLoader();

  const icons = {
    Frontend: [
      { name: 'React', src: '/skills/frontend/react.png', offset: [-1, 0, 0] },
      { name: 'HTML', src: '/skills/frontend/html.png', offset: [1, 0, 0] },
    ],
    Backend: [
      { name: 'Node', src: '/skills/backend/node.png', offset: [0, 1, 0] },
    ],
    AI: [
      { name: 'Python', src: '/skills/ai/python.png', offset: [0, 0, 0] },
    ],
    // etc.
  };

  useEffect(() => {
    if (!scene || !skill) return;

    const group = new THREE.Group();
    groupRef.current = group;

    icons[skill]?.forEach((icon) => {
      const texture = textureLoader.load(icon.src);
      const mat = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(mat);
      sprite.position.set(...icon.offset);
      sprite.scale.set(1, 1, 1);
      group.add(sprite);
    });

    group.position.set(...position);
    scene.add(group);

    return () => {
      if (group) {
        scene.remove(group);
        group.children.forEach((child) => {
          if (child.material) child.material.dispose();
          if (child.geometry) child.geometry.dispose();
        });
      }
    };
  }, [scene, skill]);

  return null;
};

export default SkillPanel3D;
