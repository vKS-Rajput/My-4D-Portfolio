// src/App.jsx
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Portals from './components/Portals';
import SectionPanel from './components/SectionPanel';
import WormholeOverlay from './components/WormholeOverlay';
import GlitchText from './components/GlitchText';
import AlienAssistant from './components/AlienAssistant';
import GlitchIntro from './components/GlitchIntro';

import vertexShader from './shaders/alienBackground.vert';
import fragmentShader from './shaders/alienBackground.frag';

import SkillPanel3D from './components/SkillPanel3D';

import TimeDistortionClock from './components/TimeDistortionClock';

import AlienBio from './components/AlienBio';


function App() {
  const mountRef = useRef(null);

  /* ---------- State ---------- */
  const [isSceneReady, setIsSceneReady] = useState(false);
  const [section, setSection] = useState(null);
  const [showWormhole, setShowWormhole] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  /* ---------- Raycaster + mouse refs ---------- */
  const raycaster = useRef(new THREE.Raycaster());
  const mouse    = useRef(new THREE.Vector2(0.5, 0.5)); // init centre
  const sceneRef = useRef();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ---------- SCENE ---------- */
    const scene   = new THREE.Scene();
    sceneRef.current = scene;
    const camera  = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0x404040));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(2, 2, 2);
    scene.add(dirLight);

    /* ---------- Multi‑layer alien shader planes ---------- */
    const planes = [];
    const depths = [-5, -10, -20];

    depths.forEach((z, i) => {
      const mat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime : { value: 0 },
          uMouse: { value: mouse.current },
          uLayer: { value: i },
        },
        transparent: true,
        depthWrite : false,
      });
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), mat);
      plane.position.z = z;
      scene.add(plane);
      planes.push({ plane, mat });
    });

    /* ---------- Tesseract ---------- */
    const verts = [
      // inner cube
      new THREE.Vector3(-1, -1, -1), new THREE.Vector3( 1, -1, -1),
      new THREE.Vector3( 1,  1, -1), new THREE.Vector3(-1,  1, -1),
      new THREE.Vector3(-1, -1,  1), new THREE.Vector3( 1, -1,  1),
      new THREE.Vector3( 1,  1,  1), new THREE.Vector3(-1,  1,  1),
      // outer cube
      new THREE.Vector3(-1.5, -1.5, -1.5), new THREE.Vector3( 1.5, -1.5, -1.5),
      new THREE.Vector3( 1.5,  1.5, -1.5), new THREE.Vector3(-1.5,  1.5, -1.5),
      new THREE.Vector3(-1.5, -1.5,  1.5), new THREE.Vector3( 1.5, -1.5,  1.5),
      new THREE.Vector3( 1.5,  1.5,  1.5), new THREE.Vector3(-1.5,  1.5,  1.5),
    ];
    const edges = [
      0,1,1,2,2,3,3,0, 4,5,5,6,6,7,7,4,
      0,4,1,5,2,6,3,7,
      8,9,9,10,10,11,11,8, 12,13,13,14,14,15,15,12,
      8,12,9,13,10,14,11,15,
      0,8,1,9,2,10,3,11,4,12,5,13,6,14,7,15
    ];
    const cubeGeo  = new THREE.BufferGeometry().setFromPoints(verts);
    cubeGeo.setIndex(edges);
    const cubeMat  = new THREE.LineBasicMaterial({ color: 0x00ffff });
    const cube     = new THREE.LineSegments(cubeGeo, cubeMat);
    scene.add(cube);

    /* ---------- Clickable Face Planes ---------- */
    const faceInfo = [
      { name: 'Frontend', pos:[ 0, 0,  1.1] },
      { name: 'Backend',  pos:[ 0, 0, -1.1] },
      { name: 'AI/ML',    pos:[ 1.1, 0,  0] },
      { name: 'Game Dev', pos:[-1.1, 0,  0] },
      { name: 'DevOps',   pos:[ 0, 1.1, 0] },
      { name: 'Design',   pos:[ 0,-1.1, 0] },
    ];
    const facePlanes = [];

    faceInfo.forEach(({ name, pos }) => {
      const pg = new THREE.PlaneGeometry(1.8,1.8);
      const pm = new THREE.MeshBasicMaterial({ visible:false });
      const pl = new THREE.Mesh(pg, pm);
      pl.name = name;
      pl.position.set(...pos);
      cube.add(pl);
      facePlanes.push(pl);
    });

    /* ---------- Starfield ---------- */
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(1500*3).map(()=> (Math.random()-0.5)*100);
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos,3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color:0x8888ff, size:0.3 }));
    scene.add(stars);

    /* ---------- Event Handlers ---------- */
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e) => {
      mouse.current.set(e.clientX/window.innerWidth, 1- e.clientY/window.innerHeight);
    };

    const handleClick = (e) => {
      mouse.current.set(e.clientX/window.innerWidth*2-1, -(e.clientY/window.innerHeight)*2+1);
      raycaster.current.setFromCamera(mouse.current, camera);
      const hits = raycaster.current.intersectObjects(facePlanes);
      if (hits.length){
        const faceName = hits[0].object.name;
        setSection(faceName);
        setShowWormhole(true);
        setTimeout(()=>setShowWormhole(false), 700);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    /* ---------- Animation Loop ---------- */
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      planes.forEach(({mat})=> mat.uniforms.uTime.value = t);

      cube.rotation.x += 0.003;
      cube.rotation.y += 0.005;
      stars.rotation.y += 0.0005;
      stars.rotation.x += 0.0003;

      controls.update();
      renderer.render(scene,camera);
    };
    animate();
    setIsSceneReady(true);

    /* ---------- Cleanup ---------- */
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      controls.dispose();

      cubeGeo.dispose(); cubeMat.dispose();
      starGeo.dispose(); stars.material.dispose();
      planes.forEach(({plane,mat}) => { plane.geometry.dispose(); mat.dispose(); });
    };
  }, []);

  /* ---------- UI ---------- */
  return (
    <div className="w-screen h-screen bg-black text-[#80ffe0] font-mono overflow-hidden">
      {showIntro && <GlitchIntro onEnter={() => setShowIntro(false)} />}

      {!showIntro && (
        <>
          {/* 👽 Alien AI Assistant */}
          <AlienAssistant />

          {/* ⏳ Time Distortion Clock */}
          <TimeDistortionClock />

          {/* 🧠 Dual Headers: Title + Name */}
          <header className="absolute top-0 left-0 w-full text-center pt-6 z-20">
            <h1 className="text-4xl font-bold tracking-widest mb-2 text-[#80ffe0] drop-shadow-lg">
              Vishwajeet Pratap Singh
            </h1>
            <p className="text-lg text-[#b8ffe7] italic font-medium tracking-wider">
              My 4D Interactive Portfolio
            </p>
          </header>

          {/* 🌌 Portals for navigation */}
          {!section && (
            <Portals
              label="Explore Vishwajeet’s Mind"
              onSelect={(sec) => {
                setShowWormhole(true);
                setTimeout(() => {
                  setSection(sec);
                  setShowWormhole(false);
                }, 700);
              }}
            />
          )}

          {/* 🌀 Wormhole effect */}
          <WormholeOverlay isActive={showWormhole} />

          {/* 🔍 Skill Section Panel */}
          <SectionPanel section={section} onClose={() => setSection(null)} />

          {/* 🧠 Skill Panel Floating in 3D */}
          {!showIntro && section && isSceneReady && (
            <SkillPanel3D
              scene={sceneRef.current}
              skill={section}
              position={[0, 0, 2]}
            />
          )}
        </>
      )}

      {/* 👤 Bio Floating Card */}
      <AlienBio />

      {/* 🖼 3D Scene Mount */}
      <div ref={mountRef} className="fixed inset-0 w-full h-full z-0" />

      {/* ⏳ Loader */}
      {!isSceneReady && !showIntro && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/80">
          <div className="h-12 w-12 animate-spin border-4 border-[#80ffe0] border-b-transparent rounded-full" />
          <p className="ml-4 text-lg text-[#80ffe0]">Calibrating Deep Space Interface…</p>
        </div>
      )}
    </div>
  );
}

export default App;
