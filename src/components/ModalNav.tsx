import { useAppContext } from "@/context";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React, { useEffect, useRef, useState } from "react";
import { ModelData } from "@/lib/modelData";
import { gsap } from "gsap";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function ModalNav() {
  const { setCurrentStage } = useAppContext();
  const [currentValue, setCurrentValue] = useState<string>("stage1");
  const modalRef = useRef<HTMLDivElement>(null);

  const handleValueChange = (value: string) => {
    if (value) {
      setCurrentValue(value);
      switch (value) {
        case "stage1":
          setCurrentStage(ModelData.stage1);
          break;
        case "stage2":
          setCurrentStage(ModelData.stage2);
          break;
        case "stage3":
          setCurrentStage(ModelData.stage3);
          break;
      }
    }
  };

  // GSAP animation to slide up from the bottom
  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { y: +50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          delay: 1,
          duration: 1,
          ease: "power2.out",
          onUpdate: function () {
            modalRef.current!.style.transform = `translateY(${
              this.targets()[0].style.y
            }px)`;
          },
        }
      );
    }
  }, []);

  return (
    <div
      ref={modalRef}
      className="p-4 flex justify-center absolute bottom-20 w-full"
    >
      <ToggleGroup
        type="single"
        value={currentValue}
        onValueChange={handleValueChange}
        className="inline-flex bg-gray-200 rounded-lg p-0 shadow-lg h-[80px] bg-opacity-70"
      >
        {Object.entries(ModelData).map(([stage, data], index) => (
          <HoverCard key={stage}>
            <HoverCardTrigger asChild>
              <ToggleGroupItem
                value={stage}
                aria-label={`Stage ${index + 1} Model`}
                className={`h-full px-8 py-4 text-lg rounded-md font-medium transition-all duration-200 ease-in-out
                  ${
                    currentValue === stage
                      ? "!bg-black !text-white shadow-sm"
                      : "!text-gray-700 hover:bg-gray-300"
                  }`}
              >
                Stage {index + 1}
              </ToggleGroupItem>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-black text-white py-7">
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-semibold">{data.card[0].title}</h3>
                <p className="text-sm text-gray-300">{data.card[0].desc}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </ToggleGroup>
    </div>
  );
}
