import { ContactShadows, Sky, SoftShadows } from "@react-three/drei";
import React from "react";
import CameraControl from "./CameraControl";
import Models from "./Models";
import Lighting from "./Lighting";

const DiseaseStages = () => {
  return (
    <>
      {/* enable soft shadow */}
      <SoftShadows size={15} />

      {/* Sky background */}
      <Sky sunPosition={[0, 5, -1]} />

      {/* lighting */}
      <Lighting />

      {/* contact shadows */}
      <ContactShadows
        position={[0.1, -0.2, -0.01]}
        opacity={0.5}
        scale={20}
        blur={3}
        far={4}
      />

      {/* floor */}
      <mesh
        scale={[50, 50, 1]}
        rotation-x={-Math.PI * 0.5}
        position-y={-0.1}
        receiveShadow
      >
        <planeGeometry />
        <meshStandardMaterial color={"white"} transparent opacity={0.5} />
      </mesh>

      {/* fog in the background */}
      <fog attach="fog" args={["white", 2, 80]} />

      {/* Camera Control component */}
      <CameraControl />

      {/* Models component */}
      <Models />
    </>
  );
};

export default DiseaseStages;
