import {
  CoordsI,
  InputNames,
} from "components/MainPage/PlacesAutocomplete/types";
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
  {
    value: TravelMode.PLANE,
    label: "На Самолете",
  },
];

function zoomToObject(obj: google.maps.Polyline, map: google.maps.Map) {
  const bounds = new google.maps.LatLngBounds();
  const points = obj.getPath().getArray();
  for (let n = 0; n < points.length; n++) {
    bounds.extend(points[n]);
  }
  map.fitBounds(bounds);
}

// Adds a marker to the map.
function addMarker(
  location: google.maps.LatLngLiteral,
  map: google.maps.Map,
  label = "A",
) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  return new google.maps.Marker({
    position: location,
    label: label,
    map: map,
  });
}

function removeAllMarkers(markers: google.maps.Marker[] = []) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}
function removeAllPolylines(polylines: google.maps.Polyline[] = []) {
  for (let i = 0; i < polylines.length; i++) {
    polylines[i].setMap(null);
  }
}

export async function handlerDrawingRoutes(
  map: google.maps.Map,
  maps: typeof google.maps,
  coords: CoordsI,
  selectedOption: TravelMode,
  directionsRenderer: google.maps.DirectionsRenderer,
  directionService: google.maps.DirectionsService,
  savePolylinesCoord: (data: google.maps.Polyline[]) => void,
  polylines: google.maps.Polyline[],
  saveMarkersCoord: (markers: google.maps.Marker[]) => void,
  markers: google.maps.Marker[],
) {
  if (!coords[InputNames.FROM] || !coords[InputNames.TO]) return;

  try {
    if (polylines.length) {
      removeAllPolylines(polylines);
      removeAllMarkers(markers);
      directionsRenderer.setMap(null);
    }
    const directionsResult = await directionService.route({
      origin: {
        lat: coords[InputNames.FROM]?.lat as number,
        lng: coords[InputNames.FROM]?.lng as number,
      },
      destination: {
        lat: coords[InputNames.TO]?.lat as number,
        lng: coords[InputNames.TO]?.lng as number,
      },
      travelMode: selectedOption as google.maps.TravelMode,
    });

    directionsRenderer.setDirections(directionsResult);
    const sideBar = document.getElementById("sidebar");
    sideBar?.classList.remove("hide");
    directionsRenderer.setPanel(sideBar as HTMLElement);
    toast.success("Маршрут отрисован");
    directionsRenderer.setMap(map);
  } catch (error) {
    drawPolyline(
      maps,
      coords,
      polylines,
      directionsRenderer,
      map,
      savePolylinesCoord,
      saveMarkersCoord,
      markers,
    );

    toast.error("AAAAAAAAAAAAAAAAA ОШИБКА");
    document.getElementById("sidebar")?.classList.add("hide");
  }
}

function drawPolyline(
  maps: typeof google.maps,
  coords: CoordsI,
  polylines: google.maps.Polyline[],
  directionsRenderer: google.maps.DirectionsRenderer,
  map: google.maps.Map,
  savePolylinesCoord: (data: google.maps.Polyline[]) => void,
  saveMarkersCoord: (markers: google.maps.Marker[]) => void,
  markers: google.maps.Marker[],
) {
  const flightPath = new maps.Polyline({
    path: [
      {
        lat: coords[InputNames.FROM]?.lat as number,
        lng: coords[InputNames.FROM]?.lng as number,
      },
      {
        lat: coords[InputNames.TO]?.lat as number,
        lng: coords[InputNames.TO]?.lng as number,
      },
    ],
    geodesic: true,
    strokeColor: "blue",
    strokeOpacity: 5.0,
    strokeWeight: 5,
  });

  // Очистить предыдущие линии
  if (polylines.length) {
    removeAllPolylines(polylines);
    removeAllMarkers(markers);
    polylines[0].setMap(null);
    directionsRenderer.setMap(null);
  }
  const markerA = addMarker(
    {
      lat: coords[InputNames.FROM]?.lat as number,
      lng: coords[InputNames.FROM]?.lng as number,
    },
    map,
    "A",
  );
  const markerB = addMarker(
    {
      lat: coords[InputNames.TO]?.lat as number,
      lng: coords[InputNames.TO]?.lng as number,
    },
    map,
    "B",
  );
  saveMarkersCoord([markerA, markerB]);
  flightPath.setMap(map);
  savePolylinesCoord([flightPath]);
  zoomToObject(flightPath, map);
}
