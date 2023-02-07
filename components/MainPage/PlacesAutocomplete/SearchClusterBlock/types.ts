import { TravelMode } from "components/MainPage/types";
import { distanceDataI } from "hooks/useCalculateDistance";
import { imagesGeoType } from "store/MainPageStore";
import { CoordsI } from "../types";

export type SearchClusterBlockType = {
  swapCoordsPlaces: () => void;
  setCoordsToStore: (coords: CoordsI | null) => void;
  radioTravelMode: TravelMode;
  map: google.maps.Map | null;
  maps: typeof google.maps | null;
  directionsRenderer: google.maps.DirectionsRenderer | null;
  directionsService: google.maps.DirectionsService | null;
  r1?: string;
  r2?: string;
  saveDistance: (data: distanceDataI) => void;
  saveGeoImages: (images: imagesGeoType) => void;
};
