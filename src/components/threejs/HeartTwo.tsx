import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";

const HeartTwo = () => {
  const group = useRef<Group>(null);
  const { nodes, materials } = useGLTF("models/heart-2.glb") as any;

  return (
    <group ref={group} dispose={null} scale={0.007} position={[0.2, 1.5, 0.4]}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2.5, 0, 0]}>
          <group
            name="1d123603c6594b95a9ca5611bfa3cbc7fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="heart_2">
                  <mesh
                    name="0"
                    geometry={nodes["0"].geometry}
                    material={materials.heart}
                    morphTargetDictionary={nodes["0"].morphTargetDictionary}
                    morphTargetInfluences={nodes["0"].morphTargetInfluences}
                    castShadow
                    receiveShadow
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("models/heart-2.glb");

export default HeartTwo;
