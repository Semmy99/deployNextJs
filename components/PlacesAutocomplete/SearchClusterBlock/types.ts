import { TravelMode } from "components/MainPage/types";
import { distanceDataI } from "hooks/useCalculateDistance";
import { CoordsI } from "../types";

export type SearchClusterBlockType = {
  swapCoordsPlaces: () => void;
  setCoordsToStore: (coords: CoordsI | null) => void;
  radioTravelMode: TravelMode;
  map: google.maps.Map | null;
  maps: typeof google.maps | null;
  directionsRenderer: google.maps.DirectionsRenderer | null;
  directionsService: google.maps.DirectionsService | null;
  handlerDrawingRoutes(
    map: google.maps.Map,
    maps: typeof google.maps,
    coords: CoordsI,
    selectedOption: google.maps.TravelMode,
    directionsRenderer: google.maps.DirectionsRenderer,
    directionService: google.maps.DirectionsService,
  ): Promise<void>;
  r1?: string;
  r2?: string;
  saveDistance: (data: distanceDataI) => void;
};