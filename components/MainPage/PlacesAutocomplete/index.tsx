import React from "react";
import { TravelMode } from "components/MainPage/types";
import styles from "styles/PlacesAutocomplete.module.css";
import RadioGroupTravelMode from "./RadioGroupTravelMode";
import SearchClusterBlock from "./SearchClusterBlock";

const PlacesAutocomplete = ({
  map,
  maps,
  directionsRenderer,
  directionsService,
}: {
  map: google.maps.Map | null;
  maps: typeof google.maps | null;
  directionsRenderer: google.maps.DirectionsRenderer | null;
  directionsService: google.maps.DirectionsService | null;
}) => {
  const [radioTravelMode, setTravelMode] = React.useState<TravelMode>(
    TravelMode.TRANSIT,
  );

  function radioHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setTravelMode(e.target.value as TravelMode);
  }

  return (
    <>
      <div className={styles.container}>
        <RadioGroupTravelMode
          radioHandler={radioHandler}
          radioTravelMode={radioTravelMode}
        />
        <SearchClusterBlock
          radioTravelMode={radioTravelMode}
          map={map}
          maps={maps}
          directionsRenderer={directionsRenderer}
          directionsService={directionsService}
        />
      </div>
    </>
  );
};

export default PlacesAutocomplete;
