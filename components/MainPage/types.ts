export enum TravelMode {
  BICYCLING = "BICYCLING",
  DRIVING = "DRIVING",
  TRANSIT = "TRANSIT",
  TWO_WHEELER = "TWO_WHEELER",
  WALKING = "WALKING",
  PLANE = "PLANE",
}
export enum UnitSystem {
  IMPERIAL = 0.0,
  METRIC = 1.0,
}
export interface SelectedI {
  value: TravelMode;
  label: string;
}
export enum TransitMode {
  /**
   * Specifies bus as a preferred mode of transit.
   */
  BUS = "BUS",
  /**
   * Specifies rail as a preferred mode of transit.
   */
  RAIL = "RAIL",
  /**
   * Specifies subway as a preferred mode of transit.
   */
  SUBWAY = "SUBWAY",
  /**
   * Specifies train as a preferred mode of transit.
   */
  TRAIN = "TRAIN",
  /**
   * Specifies tram as a preferred mode of transit.
   */
  TRAM = "TRAM",
}
