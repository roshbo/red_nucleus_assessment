import React from "react";
import { useGLTF } from "@react-three/drei";

const HeartThree = () => {
  const { nodes, materials } = useGLTF("models/heart-3.glb") as any;
  return (
    <group dispose={null} position={[0, 1.2, 0]} scale={2.2}>
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials.Material_0}
        scale={1.782}
        receiveShadow
        castShadow
      />
    </group>
  );
};

useGLTF.preload("models/heart-3.glb");

export default HeartThree;
