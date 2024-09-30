import React from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Model data array
const modelCredits = [
  {
    id: 1,
    title: "Heart 1",
    description: "Lowpoly Human Heart by ziedtouibi on Sketchfab.",
    link: "https://sketchfab.com/3d-models/lowpoly-human-heart-69d53ff1e0714f11b416eacc9263959b",
  },
  {
    id: 2,
    title: "Heart 2",
    description: "Heart Animated Anatomical 3D Model by XXII on Sketchfab.",
    link: "https://sketchfab.com/3d-models/heart-animated-anatomical-3d-model-dedbab26bd27413eaf55148caaccc9f7",
  },
  {
    id: 3,
    title: "Heart 3",
    description: "Human Heart by robertojchaidez on Sketchfab.",
    link: "https://sketchfab.com/3d-models/human-heart-f1e962fd37b44646bccbecc482141fd2",
  },
];

const Header = () => {
  return (
    <header className="absolute z-10 p-4 flex justify-between items-center w-full bg-transparent">
      <h2 className="text-xl font-semibold">Red Nucleus Assessment</h2>
      <nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <Info className="mr-2 h-4 w-4" />
              Model Credits
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>3D Model References</SheetTitle>
              <SheetDescription className="text-left">
                {modelCredits.map((model) => (
                  <div key={model.id} className="mt-4">
                    <h2>
                      <b>{model.title}:</b> <br />
                      {model.description}
                    </h2>
                    <a
                      className="text-[12px] underline"
                      href={model.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {model.link}
                    </a>
                  </div>
                ))}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Header;
