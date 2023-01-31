export enum InputNames {
  FROM = "from",
  TO = "to",
}

export type CoordsI = {
  [InputNames.FROM]?: {
    lat: number;
    lng: number;
  };
  [InputNames.TO]?: {
    lat: number;
    lng: number;
  };
};
