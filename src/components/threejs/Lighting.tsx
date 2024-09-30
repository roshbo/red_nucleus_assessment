import React from "react";
import { useControls } from "leva";
import { Environment } from "@react-three/drei";

const Lighting = () => {
  //debug control for directional light
  const { mainIntensity } = useControls("Main Light", {
    mainIntensity: {
      value: 3,
      min: 0,
      max: 5,
      step: 0.01,
    },
  });

  //debug control for spot light
  const { angle, penumbra, intensity, positionX, positionY, positionZ } =
    useControls("Spot light", {
      angle: {
        value: 1,
        min: 0,
        max: 1,
        step: 0.01,
      },
      penumbra: {
        value: 1,
        min: 0,
        max: 1,
        step: 0.01,
      },
      intensity: {
        value: 10,
        min: 0,
        max: 10,
        step: 0.01,
      },
      positionX: {
        value: 0,
        min: 0,
        max: 10,
        step: 0.1,
      },
      positionY: {
        value: 2,
        min: 0,
        max: 10,
        step: 0.1,
      },
      positionZ: {
        value: 5,
        min: 0,
        max: 10,
        step: 0.1,
      },
    });

  return (
    <>
      {/* Environment preset */}
      <Environment preset="sunset" />

      {/* directional light */}
      <directionalLight
        intensity={mainIntensity}
        position={[25, 15, 10]}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={40}
        shadow-camera-near={0.1}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-bias={-0.0001}
      />

      {/* spotlight 1 */}
      <spotLight
        angle={angle}
        penumbra={penumbra}
        intensity={intensity}
        position={[positionX, positionY, positionZ]}
        color="red"
      />

      {/* spotlight 2 */}
      <spotLight
        angle={angle}
        penumbra={penumbra}
        intensity={intensity}
        position={[positionX, positionY, positionZ]}
        color="orange"
      />
    </>
  );
};

export default Lighting;
