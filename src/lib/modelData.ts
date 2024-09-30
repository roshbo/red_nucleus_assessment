import { Vector3 } from "three";

// Define types for Labels
type LabelData = {
  text: string;
  position: Vector3;
};

// Define types for Card
type cardData = {
  title: string;
  desc: string;
};

// Define types for Heart Models
type HeartModel = {
  name: string;
  labels: LabelData[];
  card: cardData[];
};

type HeartModels = {
  stage1: HeartModel;
  stage2: HeartModel;
  stage3: HeartModel;
};

const HEART_MODELS: HeartModels = {
  stage1: {
    name: "stage1",
    labels: [
      {
        text: "Heart stage 1",
        position: new Vector3(-1.2, 1.5, 0),
      },
      {
        text: "Pulmonary arteries",
        position: new Vector3(1.3, 1.3, 0),
      },
    ],
    card: [
      {
        title: "Stage 1: Heart",
        desc: "This is a model for stage 1 for the Heart.",
      },
    ],
  },
  stage2: {
    name: "stage2",
    labels: [
      {
        text: "Heart stage 2",
        position: new Vector3(-0.6, 2, 0),
      },
    ],
    card: [
      {
        title: "Stage 2: Heart",
        desc: "This is a model for stage 2 for the Heart.",
      },
    ],
  },
  stage3: {
    name: "stage3",
    labels: [
      {
        text: "Heart stage 3",
        position: new Vector3(-1, 2, 0.5),
      },
      {
        text: "Pulmonary arteries",
        position: new Vector3(-0.8, 1.5, 0.8),
      },
    ],
    card: [
      {
        title: "Stage 3: Heart",
        desc: "This is a model for stage 3 for the Heart.",
      },
    ],
  },
};

export const ModelData = HEART_MODELS;
