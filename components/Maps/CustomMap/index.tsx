import { GetServerSideProps } from "next";
import React from "react";
import GoogleMapReact from "google-map-react";
import { useStore } from "components/StoreProvider";
import { CoordsI } from "./PlacesAutocomplete";
import useCalculateDistance from "hooks/useCalculateDistance";

const AnyReactComponent = ({ text }: any) => (
  <div style={{ color: "red" }}>{text}</div>
);

const defaultProps = {
  center: {
    lat: 53.203772,
    lng: 50.1606382,
  },
  zoom: 11,
};

export interface CustomMapI {
  setMaps: (map: google.maps.Map | null, maps: typeof google.maps) => void;
  coords: CoordsI;
}

function CustomMap({ setMaps, coords }: CustomMapI) {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    setLoaded(true);
  }, []);

  function handleApiLoaded(map: google.maps.Map, maps: typeof google.maps) {
    // const google = window.google; // ADDED
    setMaps(map, maps);
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      {loaded && (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyC5NIQhbbLpyndiCw4BIeknK7rATZmX3Hk&libraries",
          }}
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

export default React.memo(CustomMap);
