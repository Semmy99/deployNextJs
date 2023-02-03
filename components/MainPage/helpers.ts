import { CoordsI, InputNames } from "components/PlacesAutocomplete/types";
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
  // maps: typeof google.maps,
  coords: CoordsI,
  selectedOption: google.maps.TravelMode,
  directionsRenderer: google.maps.DirectionsRenderer,
  directionService: google.maps.DirectionsService,
) {
  if (!coords[InputNames.FROM] || !coords[InputNames.TO]) return;
  try {
    // Нужн найти дистанцию. и время
    // if (maps && typeof maps.DirectionsRenderer === "function") {
    // clean previous directions rendered to the map;
    // const directionsRenderer = new maps.DirectionsRenderer({});
    // const directionService = new maps.DirectionsService();
    // const service = new google.maps.places.PlacesService(map);
    // service.getDetails({placeId});
    // service.textSearch({}, (...a) => {
    //   console.log("AAAAASASAS", a);
    // });

    const directionsResult = await directionService.route({
      origin: {
        lat: coords[InputNames.FROM]?.lat as number,
        lng: coords[InputNames.FROM]?.lng as number,
      },
      destination: {
        lat: coords[InputNames.TO]?.lat as number,
        lng: coords[InputNames.TO]?.lng as number,
      },
      travelMode: selectedOption,
    });
    directionsRenderer.setDirections(directionsResult);
    directionsRenderer.setPanel(
      document.getElementById("sidebar") as HTMLElement,
    );

    toast.success("Маршрут отрисован");

    console.log("directionsResult", directionsResult);

    // directionsRenderer.setOptions({});
    directionsRenderer.setMap(map);
    // }
    // const routePolyline =
    //   new google.maps.Polyline(/* options: google.maps.PolylineOptions */);
    // routePolyline.setMap(map);
  } catch (error) {
    console.log("error", error);
    toast.error("AAAAAAAAAAAAAAAAA ОШИБКА");
  }
}
