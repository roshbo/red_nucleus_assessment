"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { ModelData } from "@/lib/modelData";
import { Vector3 } from "three";

type LabelData = {
  text: string;
  position: Vector3;
};

type cardData = {
  title: string;
  desc: string;
};

type ModelDataType = {
  name: string;
  labels: LabelData[];
  card: cardData[];
};

interface ModelControl {
  isInit: boolean;
  isRightView: boolean;
  isLeftView: boolean;
  isShowLabels: boolean;
}

type AppContextType = {
  currentStage: ModelDataType;
  setCurrentStage: Dispatch<SetStateAction<ModelDataType>>;
  modelControl: ModelControl;
  setModelControl: Dispatch<SetStateAction<ModelControl>>;
  isLoading: Boolean;
  setIsLoading: Dispatch<SetStateAction<Boolean>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
  const [currentStage, setCurrentStage] = useState<ModelDataType>(
    ModelData.stage1
  );

  const [modelControl, setModelControl] = useState<ModelControl>({
    isInit: false,
    isRightView: false,
    isLeftView: false,
    isShowLabels: true,
  });

  const [isLoading, setIsLoading] = useState<Boolean>(true);

  return (
    <AppContext.Provider
      value={{
        currentStage,
        setCurrentStage,
        modelControl,
        setModelControl,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}
