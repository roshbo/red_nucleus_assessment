import React from "react";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";

const HeartOne = () => {
  const group = React.useRef<Group>(null);
  const { nodes, materials } = useGLTF("models/heart-1.glb") as any;
  return (
    <group ref={group} dispose={null} position={[-0.7, -0.7, 0.5]}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Empty003_8" position={[0.491, 0, -0.108]}>
                <group name="Heart1_6" position={[0.077, 1.945, -0.035]}>
                  <mesh
                    name="Object_5"
                    geometry={nodes.Object_5.geometry}
                    material={materials["Material.001"]}
                    receiveShadow
                    castShadow
                  />
                </group>
                <group name="Heart2_7" position={[-0.491, 0, 0.108]}>
                  <mesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.Heart_Atrium}
                    receiveShadow
                    castShadow
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

useGLTF.preload("models/heart-1.glb");

export default HeartOne;
