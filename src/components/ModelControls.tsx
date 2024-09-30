import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import {
  Eye,
  EyeOff,
  Video,
  RotateCwSquare,
  RotateCcwSquare,
} from "lucide-react";
import { useAppContext } from "@/context";
import { gsap } from "gsap";

const ModelControls = () => {
  const { modelControl, setModelControl } = useAppContext();
  const modalControlRef = useRef<HTMLDivElement>(null);

  //function: toggle global useState for label
  const toggleLabels = () => {
    setModelControl((prevState) => ({
      ...prevState,
      isShowLabels: !prevState.isShowLabels,
    }));
  };

  //function: set global useState for reset camera view
  const resetView = () => {
    setModelControl((prevState) => ({
      ...prevState,
      isInit: true,
    }));
  };

  //function: set global useState for rotate camera right view
  const rotateRight = () => {
    setModelControl((prevState) => ({
      ...prevState,
      isRightView: true,
    }));
  };

  //function: set global useState for rotate camera left view
  const rotateLeft = () => {
    setModelControl((prevState) => ({
      ...prevState,
      isLeftView: true,
    }));
  };

  // Animate when component loads
  useEffect(() => {
    if (modalControlRef.current) {
      gsap.fromTo(
        modalControlRef.current,
        { x: +50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: 1,
          duration: 1,
          ease: "power2.out",
          onUpdate: function () {
            modalControlRef.current!.style.transform = `translateX(${
              this.targets()[0].style.x
            }px)`;
          },
        }
      );
    }
  }, []);

  //hide and show labels
  const labelButtonContent = modelControl.isShowLabels ? (
    <>
      <Eye className="mr-2" />
      <span className="hidden md:block">Hide Labels</span>
    </>
  ) : (
    <>
      <EyeOff className="mr-2" />
      <span className="hidden md:block">Show Labels</span>
    </>
  );

  //nav buttons data
  const buttons = [
    {
      icon: <Video className="mr-2" />,
      label: "Reset View",
      onClick: resetView,
    },
    {
      icon: <RotateCcwSquare className="mr-2" />,
      label: "Rotate View Right",
      onClick: rotateRight,
    },
    {
      icon: <RotateCwSquare className="mr-2" />,
      label: "Rotate View Left",
      onClick: rotateLeft,
    },
  ];

  return (
    <div
      className="absolute top-[calc(100%/2-20px)] right-0 md:top-[calc(100%/2-220px)] md:right-[calc(100vw/2-500px)] md:max-w-[200px]"
      ref={modalControlRef}
    >
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant="ghost"
          onClick={button.onClick}
          className="w-full flex justify-start"
        >
          {button.icon}
          <span className="hidden md:block">{button.label}</span>
        </Button>
      ))}
      <Button
        variant="ghost"
        onClick={toggleLabels}
        className="w-full flex justify-start"
      >
        {labelButtonContent}
      </Button>
    </div>
  );
};

export default ModelControls;
