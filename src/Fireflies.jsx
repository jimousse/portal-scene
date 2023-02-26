import { useMemo, useRef } from 'react';
import { shaderMaterial } from '@react-three/drei';
import firefliesVertexShader from './shaders/fireflies/vertex.glsl';
import firefliesFragmentShader from './shaders/fireflies/fragment.glsl';
import { extend, useFrame } from '@react-three/fiber';

const FirefliesMaterial = shaderMaterial(
  {
    uTime: 0,
    uSize: 200,
    uPixelRatio: Math.min(window.devicePixelRatio, 2),
  },
  firefliesVertexShader,
  firefliesFragmentShader
);

extend({ FirefliesMaterial });

export default function Fireflies({ count }) {
  const firefliesMaterialRef = useRef();

  const { positionArray, colorArray, scaleArray } = useMemo(() => {
    const positionArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);
    const scaleArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positionArray[i * 3 + 0] = (Math.random() - 0.5) * 6;
      positionArray[i * 3 + 1] = Math.random() * 4;
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 6;
      colorArray[i * 3 + 0] = Math.random();
      colorArray[i * 3 + 1] = Math.random();
      colorArray[i * 3 + 2] = Math.random();
      scaleArray[i] = Math.random() * 1.2;
    }
    return { positionArray, colorArray, scaleArray };
  }, [count]);

  useFrame((state, delta) => {
    firefliesMaterialRef.current.uTime += delta;
  });
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positionArray, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colorArray, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scaleArray, 1]} />
      </bufferGeometry>
      <firefliesMaterial
        ref={firefliesMaterialRef}
        transparent
        pixelRatio={Math.min(window.devicePixelRatio, 2)}
        depthWrite={false}
      />
    </points>
  );
}
