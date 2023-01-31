import { GetServerSideProps } from "next";
import React from "react";
import GoogleMapReact from "google-map-react";
import { CoordsI } from "components/PlacesAutocomplete/types";
import styles from "styles/CustomMap.module.css";
const AnyReactComponent = ({ text }: any) => (
  <div style={{ color: "red" }}>{text}</div>
);
// TODO: нужно брать положение юзера
const defaultProps = {
  center: {
    lat: 53.203772,
    lng: 50.1606382,
  },
  zoom: 11,
};

export interface CustomMapI {
  setMaps: (map: google.maps.Map | null, maps: typeof google.maps) => void;
  coords: CoordsI | null;
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
    <div className={styles.mapContainer}>
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
