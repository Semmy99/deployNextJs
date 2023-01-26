export enum InputNames {
  FIRST_POINT = "firstPoint",
  SECOND_POINT = "secondPoint",
}

export type CoordsI = {
  firstPoint?: {
    lat: number;
    lng: number;
  };
  secondPoint?: {
    lat: number;
    lng: number;
  };
};
