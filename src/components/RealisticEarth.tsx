import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { useScrollPosition } from '../context/ScrollContext';

function createMeteorTexture(type: 'tail' | 'head' | 'spark') {
  const canvas = document.createElement('canvas');
  canvas.width = type === 'tail' ? 512 : 128;
  canvas.height = type === 'tail' ? 96 : 128;
  const ctx = canvas.getContext('2d')!;

  if (type === 'tail') {
    const gradient = ctx.createLinearGradient(0, 48, 512, 48);
    gradient.addColorStop(0, 'rgba(118, 83, 255, 0)');
    gradient.addColorStop(0.14, 'rgba(129, 140, 248, 0.08)');
    gradient.addColorStop(0.55, 'rgba(192, 132, 252, 0.30)');
    gradient.addColorStop(0.82, 'rgba(255, 255, 255, 0.75)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, 48);
    ctx.quadraticCurveTo(280, 4, 512, 42);
    ctx.quadraticCurveTo(280, 92, 0, 48);
    ctx.fill();

    const core = ctx.createLinearGradient(0, 48, 512, 48);
    core.addColorStop(0, 'rgba(255,255,255,0)');
    core.addColorStop(0.72, 'rgba(255,255,255,0.45)');
    core.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = core;
    ctx.fillRect(0, 45, 512, 6);
  } else {
    const radial = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    radial.addColorStop(0, 'rgba(255,255,255,1)');
    radial.addColorStop(0.15, 'rgba(255,255,255,0.95)');
    radial.addColorStop(0.42, type === 'head' ? 'rgba(192,132,252,0.42)' : 'rgba(255,255,255,0.35)');
    radial.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, 128, 128);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function ShootingStars() {
  const groupRef = useRef<THREE.Group>(null!);
  const tailRefs = useRef<THREE.Sprite[]>([]);
  const headRefs = useRef<THREE.Sprite[]>([]);
  const sparkRefs = useRef<THREE.Sprite[][]>([]);
  const meteorsRef = useRef<
    {
      active: boolean;
      delay: number;
      life: number;
      maxLife: number;
      pos: THREE.Vector3;
      vel: THREE.Vector3;
      angle: number;
      tailLength: number;
      tailWidth: number;
      sparkOffsets: THREE.Vector3[];
    }[]
  >([]);

  const textures = useMemo(
    () => ({
      tail: createMeteorTexture('tail'),
      head: createMeteorTexture('head'),
      spark: createMeteorTexture('spark'),
    }),
    []
  );

  const spawnMeteor = (index: number, delay = Math.random() * 8) => {
    const y = 3.8 + Math.random() * 2.2;
    const x = -8 - Math.random() * 4;
    const z = -5.5 - Math.random() * 3.5;
    const velocity = new THREE.Vector3(0.085 + Math.random() * 0.045, -0.038 - Math.random() * 0.02, 0.004);
    const angle = Math.atan2(velocity.y, velocity.x);

    meteorsRef.current[index] = {
      active: false,
      delay,
      life: 0,
      maxLife: 1.6 + Math.random() * 0.9,
      pos: new THREE.Vector3(x, y, z),
      vel: velocity,
      angle,
      tailLength: 1.5 + Math.random() * 1.6,
      tailWidth: 0.16 + Math.random() * 0.16,
      sparkOffsets: Array.from({ length: 4 }, () =>
        new THREE.Vector3(-Math.random() * 0.9, (Math.random() - 0.5) * 0.18, 0)
      ),
    };
  };

  useMemo(() => {
    for (let i = 0; i < 5; i++) spawnMeteor(i, i * 3 + Math.random() * 3);
  }, []);

  useFrame((_, delta) => {
    meteorsRef.current.forEach((meteor, index) => {
      const tail = tailRefs.current[index];
      const head = headRefs.current[index];
      const sparks = sparkRefs.current[index] || [];
      if (!tail || !head || !meteor) return;

      if (!meteor.active) {
        meteor.delay -= delta;
        tail.visible = false;
        head.visible = false;
        sparks.forEach((spark) => (spark.visible = false));
        if (meteor.delay <= 0) {
          meteor.active = true;
          meteor.life = meteor.maxLife;
        }
        return;
      }

      meteor.pos.addScaledVector(meteor.vel, delta * 60);
      meteor.life -= delta;
      const progress = THREE.MathUtils.clamp(meteor.life / meteor.maxLife, 0, 1);
      const fade = Math.sin(progress * Math.PI);

      tail.visible = true;
      head.visible = true;
      tail.position.copy(meteor.pos).add(new THREE.Vector3(-meteor.vel.x * 9, -meteor.vel.y * 9, 0));
      head.position.copy(meteor.pos);
      tail.material.rotation = meteor.angle;
      tail.scale.set(meteor.tailLength, meteor.tailWidth, 1);
      head.scale.setScalar(0.12 + fade * 0.08);
      (tail.material as THREE.SpriteMaterial).opacity = 0.55 * fade;
      (head.material as THREE.SpriteMaterial).opacity = 0.9 * fade;

      sparks.forEach((spark, sparkIndex) => {
        const offset = meteor.sparkOffsets[sparkIndex];
        spark.visible = true;
        spark.position.copy(meteor.pos).add(offset);
        spark.scale.setScalar((0.035 + sparkIndex * 0.012) * fade);
        (spark.material as THREE.SpriteMaterial).opacity = 0.42 * fade;
      });

      if (meteor.life <= 0 || meteor.pos.x > 9 || meteor.pos.y < -5) {
        spawnMeteor(index, 5 + Math.random() * 9);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {meteorsRef.current.map((_, index) => (
        <group key={index}>
          <sprite ref={(node) => node && (tailRefs.current[index] = node)}>
            <spriteMaterial map={textures.tail} transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
          </sprite>
          <sprite ref={(node) => node && (headRefs.current[index] = node)}>
            <spriteMaterial map={textures.head} transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
          </sprite>
          {Array.from({ length: 4 }).map((__, sparkIndex) => (
            <sprite
              key={sparkIndex}
              ref={(node) => {
                if (!node) return;
                if (!sparkRefs.current[index]) sparkRefs.current[index] = [];
                sparkRefs.current[index][sparkIndex] = node;
              }}
            >
              <spriteMaterial map={textures.spark} transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
            </sprite>
          ))}
        </group>
      ))}
    </group>
  );
}

function EarthGroup() {
  const globeOrbitRef = useRef<THREE.Group>(null!);
  const earthRef = useRef<THREE.Group>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);
  const ringsRef = useRef<THREE.Group>(null!);
  const scrollY = useScrollPosition();

  const [colorMap, bumpMap, specularMap, cloudsMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
  ]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scrollFactor = scrollY * 0.0015;
    const orbitAngle = time * 0.26 + scrollFactor * 0.22;

    if (globeOrbitRef.current) {
      // Moves around center inside the fixed rings
      globeOrbitRef.current.position.x = Math.cos(orbitAngle) * 0.42;
      globeOrbitRef.current.position.y = Math.sin(orbitAngle) * 0.22;
      globeOrbitRef.current.position.z = Math.sin(orbitAngle * 0.85) * 0.1;
      globeOrbitRef.current.rotation.z = Math.sin(orbitAngle) * 0.04;
    }

    if (earthRef.current) {
      // Rotation on its own axis, subtly boosted by scroll
      earthRef.current.rotation.y = time * 0.05 + scrollFactor;
      earthRef.current.rotation.x = scrollFactor * 0.2;
    }

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = time * 0.06 + scrollFactor * 1.1;
    }

    if (ringsRef.current) {
      // Rings rotate slowly around center
      ringsRef.current.rotation.z = time * 0.1 + scrollFactor * 0.5;
      ringsRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group rotation={[0.2, 0, 0]}>
      <group ref={globeOrbitRef}>
        <group ref={earthRef}>
          <mesh>
            <sphereGeometry args={[2.45, 64, 64]} />
            <meshPhongMaterial
              map={colorMap}
              bumpMap={bumpMap}
              bumpScale={0.03}
              specularMap={specularMap}
              specular={new THREE.Color('grey')}
              shininess={35}
            />
          </mesh>

          <mesh ref={cloudsRef}>
            <sphereGeometry args={[2.48, 64, 64]} />
            <meshPhongMaterial
              map={cloudsMap}
              transparent
              opacity={0.5}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </group>
      </group>

      <group ref={ringsRef} rotation={[Math.PI / 2.2, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[3.35, 0.012, 64, 128]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
          <torusGeometry args={[3.8, 0.006, 64, 128]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[0, 0, -0.1]}>
          <torusGeometry args={[3.1, 0.004, 64, 128]} />
          <meshBasicMaterial color="#d8b4fe" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[0, 0, -0.18]}>
          <torusGeometry args={[4.15, 0.003, 64, 160]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.16} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  );
}

export default function RealisticEarth() {
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.7 });

  const milkyWayY = useTransform(scrollY, [0, 3000], [0, 140]);
  const milkyWayScale = useTransform(scrollY, [0, 3000], [1.02, 1.08]);
  const starsY = useTransform(scrollY, [0, 3000], [0, 80]);
  const glowY = useTransform(scrollY, [0, 3000], [0, 120]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window;
    mouseX.set((e.clientX / innerWidth - 0.5) * 70);
    mouseY.set((e.clientY / innerHeight - 0.5) * 50);
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#02030a]" onMouseMove={handleMouseMove}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(45,27,78,0.22)_0%,rgba(8,8,18,0.45)_35%,rgba(2,3,10,0.94)_78%,#02030a_100%)]" />

      <motion.div
        className="absolute inset-[-8%] bg-cover bg-center opacity-55 mix-blend-screen"
        style={{
          backgroundImage: "url('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/starfield1024.png')",
          x: useTransform(smoothX, (v) => v * -0.08),
          y: starsY,
          scale: 1.08,
        }}
      />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-[-6%] w-[220vw] sm:w-[200vw] md:w-[185vw] lg:w-[165vw] max-w-none -translate-x-1/2"
        style={{
          x: useTransform(smoothX, (v) => v * 0.12),
          y: milkyWayY,
          scale: milkyWayScale,
        }}
        animate={{ rotate: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 340, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/ESO_-_Milky_Way.jpg"
          alt="Milky Way panorama"
          className="w-full select-none opacity-95 mix-blend-screen"
          style={{
            filter: 'brightness(0.95) contrast(1.18) saturate(0.9)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
          }}
          animate={{ x: [-40, 40, -40] }}
          transition={{ duration: 320, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[170px] pointer-events-none"
        style={{
          x: useTransform(smoothX, (v) => v * 0.18),
          y: glowY,
        }}
      />

      <motion.div
        className="absolute left-[60%] top-[32%] h-[22rem] w-[22rem] rounded-full bg-fuchsia-500/8 blur-[150px] pointer-events-none"
        style={{
          x: useTransform(smoothX, (v) => v * -0.1),
          y: useTransform(smoothY, (v) => v * -0.12),
        }}
      />

      <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 3, 5]} intensity={2.0} />
        <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#a855f7" />

        <Suspense fallback={null}>
          <EarthGroup />
          <ShootingStars />
        </Suspense>
      </Canvas>

      <div className="absolute left-1/2 bottom-[14%] -translate-x-1/2 h-24 w-80 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_12%,rgba(2,3,10,0.32)_52%,rgba(2,3,10,0.8)_82%,#02030a_100%)]" />
    </div>
  );
}
