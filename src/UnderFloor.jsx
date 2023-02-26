import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import underFloorVertexShader from './shaders/under-floor/vertex.glsl';
import underFloorFragmentShader from './shaders/under-floor/fragment.glsl';
import { useRef } from 'react';

const PlaneMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  underFloorVertexShader,
  underFloorFragmentShader
);

extend({ PlaneMaterial });

export default function UnderFloor() {
  const planeMaterialRef = useRef();

  useFrame((state) => {
    planeMaterialRef.current.uTime = state.clock.elapsedTime;
  });

  return (
    <mesh
      position-y={-0.003}
      rotation-x={Math.PI * 0.5}
      scale-x={4}
      scale-y={4.7}
    >
      <planeGeometry />
      <planeMaterial ref={planeMaterialRef} />
    </mesh>
  );
}
