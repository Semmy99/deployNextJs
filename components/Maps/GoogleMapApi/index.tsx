import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import styles from "styles/CustomMap.module.css";

import { CoordsI } from "components/MainPage/PlacesAutocomplete/types";

const containerStyle = {
  width: "100vw",
  height: "50vh",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function GoogleMapApi({ coords }: { coords: CoordsI | null }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC5NIQhbbLpyndiCw4BIeknK7rATZmX3Hk&libraries",
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className={styles.mapContainer}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMapApi);
