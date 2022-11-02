import { GetServerSideProps } from "next";
import React from "react";
import GoogleMapReact from "google-map-react";
import { useStore } from "components/StoreProvider";

const AnyReactComponent = ({ text }: any) => (
  <div style={{ color: "red" }}>{text}</div>
);
const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const defaultCenter = {
  lat: 36.1774465,
  lng: -86.7042552,
};

function MyComponentMap() {
  const [loaded, setLoaded] = React.useState(false);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const {
    MainPageStore: { coords },
  } = useStore();
  console.log("coords", coords);
  const defaultProps = {
    center: {
      lat: 53.203772,
      lng: 50.1606382,
    },
    zoom: 11,
  };

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  function handleApiLoaded(map: google.maps.Map, maps: typeof google.maps) {
    console.log("handleApiLoaded");
    // TODO: Пример Указания маршрута
    // Нужн найти дистанцию. и время
    if (maps && typeof maps.DirectionsRenderer === "function") {
      // clean previous directions rendered to the map;
      const directionDisplay = new maps.DirectionsRenderer({});
      const directionService = new maps.DirectionsService();
      directionService.route(
        {
          origin: {
            lat: 53.203772,
            lng: 50.1606382,
          },
          destination: {
            lat: 55.755826,
            lng: 37.6173,
          },
          travelMode: "WALKING" as google.maps.TravelMode,
        },
        function (response, status) {
          console.log("response, status", response, status);
          if (status === "OK") {
            directionDisplay.setDirections(response);
          } else {
            console.log("AAAAAAAAAAAAAAAAA ОШИБКА");
          }
        },
      );
      directionDisplay.setOptions({});
      directionDisplay.setMap(map);
    }
    const routePolyline =
      new google.maps.Polyline(/* options: google.maps.PolylineOptions */);
    routePolyline.setMap(map);
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      {loaded && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultProps.center || coords}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          {/* <AnyReactComponent
            lat={coords?.firstPoint || 53.203772}
            lng={coords?.secondPoint || 50.1606382}
            text="My MarkerRRRRRRRRRRRRRRRRRRRRRRRRRR"
          /> */}
        </GoogleMapReact>
      )}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSideProps) {
  const body = await (
    await fetch("https://jsonplaceholder.typicode.com/todos/1")
  ).json();

  return {
    props: { initialState: { data: body }, body }, // will be passed to the page component as props
  };
}

export default React.memo(MyComponentMap);
