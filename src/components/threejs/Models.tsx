import React, { useEffect, useRef, useState } from "react";
import HeartOne from "./HeartOne";
import HeartTwo from "./HeartTwo";
import HeartThree from "./HeartThree";
import { Group } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { Billboard, Text } from "@react-three/drei";
import { useAppContext } from "@/context";

const Models = () => {
  const currentModal = useRef<Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState<Boolean>(false);
  const { viewport } = useThree();

  const { currentStage, modelControl } = useAppContext();

  //get mouse position
  useEffect(() => {
    const handleMouseMove = (event: { clientX: number; clientY: number }) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Detect if the screen is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile screen width threshold (768px)
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it on initial load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //useFrame
  useFrame((state) => {
    const rotationSpeed = 0.1;
    const targetRotationX = mouse.y * rotationSpeed;
    const targetRotationY = mouse.x * rotationSpeed;

    const elapsedTime = state.clock.getElapsedTime();
    const floatingAmplitude = 0.05;
    const floatingSpeed = 1;

    // Use GSAP to animate model rotation on the movement of the mouse
    if (currentModal.current) {
      gsap.to(currentModal.current.rotation, {
        x: targetRotationX,
        y: targetRotationY,
        duration: 1,
        ease: "power2.out",
      });

      // Animate floating by adjusting the y position
      currentModal.current.position.y =
        Math.sin(elapsedTime * floatingSpeed) * floatingAmplitude;
    }
  });

  //function: render modal based on the selection
  const renderHeartModel = () => {
    switch (currentStage.name) {
      case "stage1":
        return <HeartOne />;
      case "stage2":
        return <HeartTwo />;
      case "stage3":
        return <HeartThree />;
      default:
        return null;
    }
  };

  // Adjust scale based on mobile or desktop
  const scaleFactor = isMobile ? 0.5 : viewport.width / 10;

  return (
    <group scale={scaleFactor}>
      <mesh position-y={-0.001} receiveShadow castShadow>
        <cylinderGeometry args={[2.5, 2.5, 0.1, 64]} />
        <meshStandardMaterial roughness={5} color="white" />
      </mesh>

      {/* Render the current heart model */}
      <group ref={currentModal}>
        {renderHeartModel()}

        {/* show label */}
        {modelControl.isShowLabels &&
          currentStage.labels.map((label, index) => (
            <Billboard position={label.position}>
              <Text fontSize={0.1} fontWeight={"bold"} anchorX={"right"}>
                {label.text}
                <meshStandardMaterial color="red" emissive={"red"} />
              </Text>
              <Text
                fontSize={0.1}
                fontWeight={"bold"}
                anchorX={"right"}
                position={[0.001, -0.001, -0.001]}
              >
                {label.text}
                <meshStandardMaterial
                  color="black"
                  emissive="black"
                  emissiveIntensity={20}
                />
              </Text>
            </Billboard>
          ))}
      </group>
    </group>
  );
};

export default Models;
