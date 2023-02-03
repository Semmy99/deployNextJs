import React from "react";
import { TravelMode } from "components/MainPage/types";
import styles from "styles/PlacesAutocomplete.module.css";
import { observer } from "mobx-react";
import { CoordsI } from "./types";
import RadioGroupTravelMode from "./RadioGroupTravelMode";
import SearchClusterBlock from "./SearchClusterBlock";
import { distanceDataI } from "hooks/useCalculateDistance";

const PlacesAutocomplete = ({
  r1 = "",
  r2 = "",
  map,
  maps,
  directionsRenderer,
  directionsService,
  setCoordsToStore,
  swapCoordsPlaces,
  saveDistance,
}: {
  r1?: string;
  r2?: string;
  map: google.maps.Map | null;
  maps: typeof google.maps | null;
  directionsRenderer: google.maps.DirectionsRenderer | null;
  directionsService: google.maps.DirectionsService | null;
  setCoordsToStore: (coords: CoordsI | null) => void;
  swapCoordsPlaces: () => void;
  saveDistance: (data: distanceDataI) => void;
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
          swapCoordsPlaces={swapCoordsPlaces}
          setCoordsToStore={setCoordsToStore}
          radioTravelMode={radioTravelMode}
          map={map}
          maps={maps}
          directionsRenderer={directionsRenderer}
          directionsService={directionsService}
          r1={r1}
          r2={r2}
          saveDistance={saveDistance}
        />
      </div>
    </>
  );
};

export default observer(PlacesAutocomplete);
