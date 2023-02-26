import { useRef } from 'react';
import {
  shaderMaterial,
  Center,
  useTexture,
  useGLTF,
  OrbitControls,
} from '@react-three/drei';
import * as THREE from 'three';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import { extend, useFrame } from '@react-three/fiber';
import portalVertexShader from './shaders/portal/vertex.glsl';
import portalFragmentShader from './shaders/portal/fragment.glsl';
import Fireflies from './Fireflies';

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#ffffff'),
    uColorEnd: new THREE.Color('#000000'),
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial });

export default function Experience() {
  const { nodes } = useGLTF('./model/portal.glb');
  const bakedTexture = useTexture('./model/baked.jpg');
  const portalMaterialRef = useRef();
  const { firefliesCount, portalColorStart, portalColorEnd } = useControls({
    firefliesCount: {
      value: 1000,
      min: 0,
      max: 2000,
      step: 10,
    },
    portalColorStart: '#fff',
    portalColorEnd: '#f98282',
  });

  useFrame((state, delta) => {
    portalMaterialRef.current.uTime += delta;
  });

  return (
    <>
      <Perf position={'top-left'} />
      <color args={['#030202']} attach="background" />
      <OrbitControls makeDefault />

      <Center rotation={[0, Math.PI, 0]}>
        <mesh
          geometry={nodes.mergedScene.geometry}
          position={nodes.mergedScene.position}
          rotation={nodes.mergedScene.rotation}
        >
          <meshBasicMaterial
            side={THREE.DoubleSide}
            map={bakedTexture}
            map-flipY={false}
          />
        </mesh>

        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
          rotation={nodes.poleLightB.rotation}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
          rotation={nodes.poleLightA.rotation}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          <portalMaterial
            uColorStart={portalColorStart}
            uColorEnd={portalColorEnd}
            ref={portalMaterialRef}
            side={THREE.DoubleSide}
          />
        </mesh>

        <Fireflies count={firefliesCount} />
      </Center>
    </>
  );
}
