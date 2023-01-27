import React from "react";
import { TravelMode } from "components/MainPage/types";
import styles from "styles/PlacesAutocomplete.module.css";
import { observer } from "mobx-react";
import { CoordsI } from "./types";
import { handleCoords } from "components/MainPage/helpers";
import RadioGroupTravelMode from "./RadioGroupTravelMode";
import SearchClusterBlock from "./SearchClusterBlock";

const PlacesAutocomplete = ({
  r1 = "",
  r2 = "",
  map,
  maps,
  directionsRenderer,
  directionsService,
  coords,
  setCoordsToStore,
  swapCoordsPlaces,
}: {
  r1?: string;
  r2?: string;
  map: google.maps.Map | null;
  maps: typeof google.maps | null;
  coords: CoordsI | null;
  directionsRenderer: google.maps.DirectionsRenderer | null;
  directionsService: google.maps.DirectionsService | null;
  setCoordsToStore: (coords: CoordsI | null) => void;
  swapCoordsPlaces: () => void;
}) => {
  const [radioTravelMode, setTravelMode] = React.useState<TravelMode>(
    TravelMode.TRANSIT,
  );

  // const distance = useCalculateDistance({
  //   origin: firstPointVal,
  //   destination: secondPointVal,
  //   travelMode: TravelMode[radioTravelMode],
  //   unitSystem: UnitSystem.IMPERIAL,
  //   transitOpt: {
  //     modes: [TransitMode.BUS],
  //   },
  // });
  // console.log("distance", distance, firstPointVal, secondPointVal);

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
          coords={coords}
          setCoordsToStore={setCoordsToStore}
          radioTravelMode={radioTravelMode}
          map={map}
          maps={maps}
          directionsRenderer={directionsRenderer}
          directionsService={directionsService}
          handleCoords={handleCoords}
          r1={r1}
          r2={r2}
        />
      </div>
      <h2>firstPoint</h2>
      <p>
        <b>lat:</b>
        {coords?.firstPoint?.lat || ""} <b>lng</b>:
        {coords?.firstPoint?.lng || ""}
      </p>
      <h2>secondPoint</h2>
      <p>
        <b>lat:</b> {coords?.secondPoint?.lat || ""} <b>lng</b>:
        {coords?.secondPoint?.lng || ""}
      </p>
      {/* <h3>km {distance?.km}</h3>
      <h3>mile {distance?.mile}</h3>
      <h3>Time {distance?.txt}</h3> */}
    </>
  );
};

export default observer(PlacesAutocomplete);
