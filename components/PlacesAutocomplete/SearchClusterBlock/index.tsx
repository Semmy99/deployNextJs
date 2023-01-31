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
import { TravelMode, UnitSystem } from "components/MainPage/types";
import React from "react";
import useCalculateDistance from "hooks/useCalculateDistance";
import { SearchClusterBlockType } from "./types";

function SearchClusterBlock({
  swapCoordsPlaces,
  setCoordsToStore,
  radioTravelMode,
  map,
  maps,
  directionsRenderer,
  directionsService,
  handlerDrawingRoutes,
  r1,
  r2,
  saveDistance,
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
        handleInput(r1, "type", InputNames.FROM);
        const results = await getGeocode({ address: r1 });
        const latLng = getLatLng(results[0]);
        newCoords[InputNames.FROM] = latLng;
      }
      if (r2) {
        handleInput(r2, "type", InputNames.TO);
        const results = await getGeocode({ address: r2 });
        const latLng = getLatLng(results[0]);
        newCoords[InputNames.TO] = latLng;
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
      if (inputName === InputNames.FROM) {
        firstPointSetVal(txt, false);
        firstPointClearSuggestions();
      }
      if (inputName === InputNames.TO) {
        secondPointSetVal(txt, false);
        secondPointClearSuggestions();
      }
      return;
    }
    // В противном случае обновляем значение и стягиваем через апи новые значения
    if (inputName === InputNames.FROM) {
      firstPointSetVal(txt);
    }
    if (inputName === InputNames.TO) {
      secondPointSetVal(txt);
    }
  };

  const handleSelect = (
    e: React.FormEvent<any>,
    data: Autosuggest.SuggestionSelectedEventData<google.maps.places.AutocompletePrediction>,
    inputName: InputNames,
  ) => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    if (inputName === InputNames.FROM) {
      firstPointSetVal(data.suggestion.description, false);
      firstPointClearSuggestions();
    }
    if (inputName === InputNames.TO) {
      secondPointSetVal(data.suggestion.description, false);
      secondPointClearSuggestions();
    }
  };

  async function handlerGeoCoding(from: string, to: string) {
    const fromRes = await getGeocode({ address: from });
    const latLngFrom = getLatLng(fromRes[0]);
    const toRes = await getGeocode({ address: to });
    const latLngTo = getLatLng(toRes[0]);
    const coords = {
      [InputNames.FROM]: latLngFrom,
      [InputNames.TO]: latLngTo,
    };
    setCoordsToStore(coords);
    return coords;
  }

  useCalculateDistance({
    origin: firstPointVal,
    destination: secondPointVal,
    travelMode: TravelMode[radioTravelMode],
    unitSystem: UnitSystem.IMPERIAL,
    handlerSaveData: saveDistance,
  });

  return (
    <div className={styles.formField}>
      <div className={styles.formFieldContainer}>
        <OutsideClickHandler
          onOutsideClick={() => {
            // When user clicks outside of the component, we can dismiss
            // the searched suggestions by calling this method
            firstPointClearSuggestions();
          }}
        >
          <div>
            <InputAutocomplete
              handleInput={handleInput}
              value={firstPointVal}
              suggestions={firstPointData}
              handleSelect={handleSelect}
              clearSuggestions={firstPointClearSuggestions}
              disabled={!firstPointReady}
              inputName={InputNames.FROM}
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
          <div>
            <InputAutocomplete
              handleInput={handleInput}
              value={secondPointVal}
              suggestions={secondPointData}
              handleSelect={handleSelect}
              clearSuggestions={secondPointClearSuggestions}
              disabled={!secondPointReady}
              inputName={InputNames.TO}
              placeholder="Куда"
            />
          </div>
        </OutsideClickHandler>
      </div>
      <Button
        title="Построить маршрут"
        onClick={async () => {
          const coords = await handlerGeoCoding(firstPointVal, secondPointVal);
          // coords?.[InputNames.FROM] &&
          //   coords?.[InputNames.TO] &&
          //   setCoordsToStore(coords);

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
        disabled={!firstPointVal || !secondPointVal}
        // disabled={!coords?.[InputNames.FROM] || !coords?.[InputNames.TO]}
        className={styles.btn}
      />
    </div>
  );
}

export default SearchClusterBlock;
