import { CoordsI } from "components/PlacesAutocomplete/types";
import { toast } from "react-toastify";
import { TravelMode } from "./types";

export const options = [
  {
    value: TravelMode.TRANSIT,
    label: "TRANSIT",
  },
  {
    value: TravelMode.BICYCLING,
    label: "Велосипед нах",
  },
  { value: TravelMode.DRIVING, label: "на мищинэ" },
  {
    value: TravelMode.WALKING,
    label: "Топ топ ножками",
  },
];

export async function handlerDrawingRoutes(
  map: google.maps.Map,
  maps: typeof google.maps,
  coords: CoordsI,
  selectedOption: google.maps.TravelMode,
  directionsRenderer: google.maps.DirectionsRenderer,
  directionService: google.maps.DirectionsService,
) {
  if (!coords.firstPoint || !coords.secondPoint) return;
  try {
    // Нужн найти дистанцию. и время
    if (maps && typeof maps.DirectionsRenderer === "function") {
      // clean previous directions rendered to the map;
      // const directionsRenderer = new maps.DirectionsRenderer({});
      // const directionService = new maps.DirectionsService();
      const directionsResult = await directionService.route({
        origin: {
          lat: coords.firstPoint?.lat as number,
          lng: coords.firstPoint?.lng as number,
        },
        destination: {
          lat: coords.secondPoint?.lat as number,
          lng: coords.secondPoint?.lng as number,
        },
        travelMode: selectedOption,
      });
      console.log("directionsResult", directionsResult);

      directionsRenderer.setDirections(directionsResult);
      // console.log("AAAA", document.getElementById("sidebar"));
      directionsRenderer.setPanel(
        document.getElementById("sidebar") as HTMLElement,
      );

      toast.success("Маршрут отрисован");

      // console.log("directionsResult", directionsResult);

      // directionsRenderer.setOptions({});
      directionsRenderer.setMap(map);
    }
    // const routePolyline =
    //   new google.maps.Polyline(/* options: google.maps.PolylineOptions */);
    // routePolyline.setMap(map);
  } catch (error) {
    console.log("error", error);
    toast.error("AAAAAAAAAAAAAAAAA ОШИБКА");
  }
}
