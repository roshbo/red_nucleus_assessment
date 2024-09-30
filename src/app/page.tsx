"use client";

import DiseaseStages from "@/components/threejs/DiseaseStages";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import Header from "@/components/Header";
import ModalNav from "@/components/ModalNav";
import ModelControls from "@/components/ModelControls";
import { Leva } from "leva";
import Loader from "@/components/Loader";
import { useAppContext } from "@/context";
import { gsap } from "gsap";

export default function Home() {
  const { isLoading } = useAppContext();
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current && !isLoading) {
      // Animate when component loads
      gsap.fromTo(
        titleRef.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          delay: 1,
          duration: 1,
          ease: "power2.out",
          onUpdate: function () {
            titleRef.current!.style.transform = `translateY(${
              this.targets()[0].style.y
            }px)`;
          },
        }
      );
    }
  }, [isLoading]);

  return (
    <div className="h-screen flex flex-col relative">
      {/* header component */}
      <Header />

      <Suspense fallback={null}>
        {/* Canvas - full screen*/}
        <Canvas shadows className="absolute inset-0 z-0 w-full h-full">
          {/* main experience */}
          <DiseaseStages />
        </Canvas>
      </Suspense>

      {/* debug */}
      <Leva hidden={true} />

      {isLoading ? (
        // preloader
        <Loader />
      ) : (
        <main className="flex-grow flex flex-col items-center absolute w-full h-full">
          <h1
            className="drop-shadow-md text-4xl font-roboto font-black mb-8 px-4 py-2 rounded-lg mt-20 bg-gradient-to-r from-black to-slate-500 inline-block text-transparent bg-clip-text"
            ref={titleRef}
          >
            Understanding Disease States
          </h1>

          {/* Model Toggler */}
          <ModalNav />

          {/* Camera and label controller */}
          <ModelControls />
        </main>
      )}
    </div>
  );
}
