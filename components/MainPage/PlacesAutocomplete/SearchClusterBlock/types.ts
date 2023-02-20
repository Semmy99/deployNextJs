import { TravelMode } from "components/MainPage/types";

export type SearchClusterBlockType = {
  radioTravelMode: TravelMode;
  map: google.maps.Map | null;
  maps: typeof google.maps | null;
  directionsRenderer: google.maps.DirectionsRenderer | null;
  directionsService: google.maps.DirectionsService | null;
};
