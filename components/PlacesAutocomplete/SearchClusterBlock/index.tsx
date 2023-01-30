import Button from "components/Button";
import OutsideClickHandler from "react-outside-click-handler";
import InputAutocomplete from "../InputAutocomplete";
import { CoordsI, InputNames } from "../types";
import styles from "styles/SearchClusterBlock.module.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Autosuggest from "react-autosuggest";
import Image from "next/image";
import { TravelMode } from "components/MainPage/types";
import React from "react";

type SearchClusterBlockType = {
  swapCoordsPlaces: () => void;
  coords: CoordsI | null;
  setCoordsToStore: (coords: CoordsI | null) => void;
  radioTravelMode: TravelMode;
  map: google.maps.Map | null;
  maps: typeof google.maps | null;
  directionsRenderer: google.maps.DirectionsRenderer | null;
  directionsService: google.maps.DirectionsService | null;
  handlerDrawingRoutes(
    map: google.maps.Map,
    maps: typeof google.maps,
    coords: CoordsI,
    selectedOption: google.maps.TravelMode,
    directionsRenderer: google.maps.DirectionsRenderer,
    directionService: google.maps.DirectionsService,
  ): Promise<void>;
  r1?: string;
  r2?: string;
};

function SearchClusterBlock({
  swapCoordsPlaces,
  coords,
  setCoordsToStore,
  radioTravelMode,
  map,
  maps,
  directionsRenderer,
  directionsService,
  handlerDrawingRoutes,
  r1,
  r2,
}: SearchClusterBlockType) {
  const {
    ready: firstPointReady,
    value: firstPointVal,
    setValue: firstPointSetVal,
    suggestions: { status: firstPointStatus, data: firstPointData },
    clearSuggestions: firstPointClearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const {
    ready: secondPointReady,
    value: secondPointVal,
    setValue: secondPointSetVal,
    suggestions: { status: secondPointStatus, data: secondPointData },
    clearSuggestions: secondPointClearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  // установка значений  из query params
  React.useEffect(() => {
    async function updateCoordsByQueryParams() {
      const newCoords: CoordsI = {};
      if (r1) {
        handleInput(r1, "type", InputNames.FIRST_POINT);
        const results = await getGeocode({ address: r1 });
        const latLng = getLatLng(results[0]);
        newCoords[InputNames.FIRST_POINT] = latLng;
      }
      if (r2) {
        handleInput(r2, "type", InputNames.SECOND_POINT);
        const results = await getGeocode({ address: r2 });
        console.log("results", results);
        const latLng = getLatLng(results[0]);
        newCoords[InputNames.SECOND_POINT] = latLng;
      }
      setCoordsToStore(newCoords);
    }
    updateCoordsByQueryParams();
  }, [r1, r2]);

  const handleInput = (
    txt: string,
    method: "type" | "down" | "up" | "escape" | "enter" | "click",
    inputName: InputNames,
  ) => {
    // Если кликнули по выпадающему списку
    // устанавливать значение в апи places, очищать список
    if (method === "click") {
      if (inputName === InputNames.FIRST_POINT) {
        firstPointSetVal(txt, false);
        firstPointClearSuggestions();
      }
      if (inputName === InputNames.SECOND_POINT) {
        secondPointSetVal(txt, false);
        secondPointClearSuggestions();
      }
      return;
    }
    // В противном случае обновляем значение и стягиваем через апи новые значения
    if (inputName === InputNames.FIRST_POINT) {
      firstPointSetVal(txt);
    }
    if (inputName === InputNames.SECOND_POINT) {
      secondPointSetVal(txt);
    }
    // Чистим координаты если значение удалено
    if (!txt) {
      setCoordsToStore({ ...coords, [inputName]: null });
      // setCoords((prev) => {
      //   return { ...(prev || {}), [inputName]: null };
      // });
    }
  };

  const handleSelect = (
    e: React.FormEvent<any>,
    data: Autosuggest.SuggestionSelectedEventData<google.maps.places.AutocompletePrediction>,
    inputName: InputNames,
  ) => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    if (inputName === InputNames.FIRST_POINT) {
      firstPointSetVal(data.suggestion.description, false);
      firstPointClearSuggestions();
    }
    if (inputName === InputNames.SECOND_POINT) {
      secondPointSetVal(data.suggestion.description, false);
      secondPointClearSuggestions();
    }
    // Get latitude and longitude via utility functions
    getGeocode({ address: data.suggestion.description }).then((results) => {
      const latLng = getLatLng(results[0]);
      setCoordsToStore({ ...coords, [inputName]: latLng });
    });
  };

  return (
    <div className={styles.formField}>
      <OutsideClickHandler
        onOutsideClick={() => {
          // When user clicks outside of the component, we can dismiss
          // the searched suggestions by calling this method
          firstPointClearSuggestions();
        }}
      >
        <div className={styles.autocomplete}>
          <InputAutocomplete
            handleInput={handleInput}
            value={firstPointVal}
            suggestions={firstPointData}
            handleSelect={handleSelect}
            clearSuggestions={firstPointClearSuggestions}
            disabled={!firstPointReady}
            inputName={InputNames.FIRST_POINT}
            placeholder="Откуда"
          />
        </div>
      </OutsideClickHandler>
      <span
        className={styles.refreshIcon}
        onClick={() => {
          swapCoordsPlaces();
          firstPointSetVal(secondPointVal);
          secondPointSetVal(firstPointVal);
        }}
      >
        <Image
          src="/refreshing.svg"
          alt="Поменять значения местами"
          quality="100"
          placeholder="empty"
          width={20}
          height={20}
          // blurDataURL="/"
        />
      </span>
      <OutsideClickHandler onOutsideClick={secondPointClearSuggestions}>
        <div className={styles.autocomplete}>
          <InputAutocomplete
            handleInput={handleInput}
            value={secondPointVal}
            suggestions={secondPointData}
            handleSelect={handleSelect}
            clearSuggestions={secondPointClearSuggestions}
            disabled={!secondPointReady}
            inputName={InputNames.SECOND_POINT}
            placeholder="Куда"
          />
        </div>
      </OutsideClickHandler>
      <Button
        title="Построить маршрут"
        onClick={() => {
          console.log("CLICK");

          coords?.[InputNames.FIRST_POINT] &&
            coords?.[InputNames.SECOND_POINT] &&
            setCoordsToStore(coords);

          radioTravelMode &&
            map &&
            maps &&
            coords &&
            directionsRenderer &&
            directionsService &&
            handlerDrawingRoutes(
              map,
              maps,
              coords,
              radioTravelMode,
              directionsRenderer,
              directionsService,
            );
        }}
        disabled={
          !coords?.[InputNames.FIRST_POINT] ||
          !coords?.[InputNames.SECOND_POINT]
        }
        className={styles.btn}
      />
    </div>
  );
}

export default SearchClusterBlock;
