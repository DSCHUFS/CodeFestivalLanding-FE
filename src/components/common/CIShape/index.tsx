'use client';
import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber';
import { clsx } from 'clsx';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

import * as styles from './styles.css';

type SceneReadyProps = {
  onReady: () => void;
};

const SceneReady = ({ onReady }: SceneReadyProps) => {
  useEffect(() => {
    onReady();
  }, [onReady]);

  return null;
};

const DShape = (props: ThreeElements['mesh']) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const swaySpeedRef = useRef(0.01);
  const swayAmplitudeRef = useRef(1.0);
  const elapsedTimeRef = useRef(0);

  useFrame(() => {
    elapsedTimeRef.current += swaySpeedRef.current;
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(elapsedTimeRef.current) * swayAmplitudeRef.current;
    }
  });

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(18.9, 9.7);
    shape.lineTo(30.5, 9.7);
    shape.lineTo(30.5, 0.2);
    shape.lineTo(0.7, 0.2);
    shape.lineTo(0.7, 73.5);
    shape.lineTo(30.5, 73.5);
    shape.lineTo(30.5, 64.3);
    shape.lineTo(18.9, 64.3);
    shape.lineTo(18.9, 9.7);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 10,
      bevelEnabled: true,
      bevelSize: 1.5,
      bevelThickness: 1.5,
      bevelSegments: 10,
      curveSegments: 64,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  return (
    <mesh
      {...props}
      ref={meshRef}
      geometry={geometry}
      scale={[1, 1, 1]}
      rotation={[
        THREE.MathUtils.degToRad(18),
        THREE.MathUtils.degToRad(26),
        THREE.MathUtils.degToRad(8.1),
      ]}
    >
      <meshStandardMaterial
        attach="material"
        metalness={0.7}
        roughness={0.2}
        color={0x363850}
        emissive={0x000000}
        emissiveIntensity={0.05}
      />
    </mesh>
  );
};

const CIShape = () => {
  const [isReady, setIsReady] = useState(false);
  const handleReady = useCallback(() => setIsReady(true), []);

  return (
    <div className={clsx(styles.canvas, isReady && styles.canvasReady)}>
      <Canvas camera={{ position: [0, 0, 80], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 7.5]} intensity={0.8} />
        <Suspense fallback={null}>
          <Environment path="/static/hdri/" files="venice_sunset_1k.hdr" />
          <DShape />
          <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />
          <SceneReady onReady={handleReady} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CIShape;
