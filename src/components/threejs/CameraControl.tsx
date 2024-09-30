import React, { useEffect, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";
import { useAppContext } from "@/context";

function CameraControl() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { modelControl, setModelControl } = useAppContext();
  const radius = 6; // Distance from the center
  const centerY = 1; // Y position of the center

  // useEffect to Animate camera zoom-in when component loads
  useEffect(() => {
    if (cameraRef.current) {
      gsap.from(cameraRef.current.position, {
        z: 20,
        y: 4,
        duration: 2,
        ease: "power2.Out",
      });
    }
  }, []);

  //useEffect to control the camera control when is clicked
  useEffect(() => {
    setModelControl((prevState) => ({
      ...prevState,
      isInit: false,
      isRightView: false,
      isLeftView: false,
    }));

    if (cameraRef.current) {
      if (modelControl.isLeftView) {
        rotateLeft();
      } else if (modelControl.isRightView) {
        rotateRight();
      } else if (modelControl.isInit) {
        resetView();
      }
    }
  }, [modelControl.isInit, modelControl.isLeftView, modelControl.isRightView]);

  // function: rotate camera view to the left
  const rotateLeft = () => {
    if (cameraRef.current) {
      gsap.to(cameraRef.current, {
        duration: 0.5,
        ease: "power2.Out",
        onUpdate: () => {
          const currentAngle = Math.atan2(
            cameraRef.current!.position.z,
            cameraRef.current!.position.x
          );
          const newAngle = currentAngle + (Math.PI / 2) * 0.02;
          cameraRef.current!.position.x = Math.cos(newAngle) * radius;
          cameraRef.current!.position.z = Math.sin(newAngle) * radius;
          updateCameraLookAt();
        },
      });
    }
  };

  // function: rotate camera view to the right
  const rotateRight = () => {
    if (cameraRef.current) {
      gsap.to(cameraRef.current, {
        duration: 0.5,
        ease: "power2.Out",
        onUpdate: () => {
          const currentAngle = Math.atan2(
            cameraRef.current!.position.z,
            cameraRef.current!.position.x
          );
          const newAngle = currentAngle - (Math.PI / 2) * 0.02;
          cameraRef.current!.position.x = Math.cos(newAngle) * radius;
          cameraRef.current!.position.z = Math.sin(newAngle) * radius;
          updateCameraLookAt();
        },
      });
    }
  };

  // function: reset camera view
  const resetView = () => {
    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        x: 0,
        y: centerY,
        z: radius,
        duration: 1,
        ease: "power2.Out",
        onUpdate: updateCameraLookAt,
      });
    }
  };

  //funciton: camera to look at the stage
  const updateCameraLookAt = () => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(new THREE.Vector3(0, centerY, 0));
    }
  };

  return (
    <>
      {/* Main Camera */}
      <PerspectiveCamera
        makeDefault
        position={[0, centerY, radius]}
        fov={50}
        ref={cameraRef}
      />

      {/* <OrbitControls maxPolarAngle={Math.PI / 2.5} /> */}
    </>
  );
}

export default CameraControl;
