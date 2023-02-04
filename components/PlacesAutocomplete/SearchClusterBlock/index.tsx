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
import { useRouter } from "next/router";
import { updateCoordsByQueryParams } from "./helpers";
import { handlerDrawingRoutes } from "components/MainPage/helpers";
import { toJS } from "mobx";

function SearchClusterBlock({
  swapCoordsPlaces,
  setCoordsToStore,
  radioTravelMode,
  map,
  maps,
  directionsRenderer,
  directionsService,
  r1,
  r2,
  saveDistance,
}: SearchClusterBlockType) {
  const router = useRouter();

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
  React.useEffect(() => {
    async function firstRender() {
      if (router.pathname.includes("direction")) {
        const coords = await handlerGeoCoding(r1 as string, r2 as string);

        radioTravelMode &&
          map &&
          maps &&
          coords &&
          directionsRenderer &&
          directionsService &&
          handlerDrawingRoutes(
            map,
            // maps,
            coords,
            radioTravelMode,
            directionsRenderer,
            directionsService,
          );

        updateCoordsByQueryParams({
          r1,
          r2,
          setCoordsToStore,
          handleInput,
        });
      }
    }
    firstRender();
    // setTimeout(() => {
    // }, 2000);
  }, [map]);
  // установка значений  из query params
  // TODO: не работает из-за того что лежит в эффекте
  // React.useEffect(() => {
  //   async function updateCoordsByQueryParams() {
  //     const newCoords: CoordsI = {};
  //     if (r1) {
  //       handleInput(r1, "type", InputNames.FROM);
  //       const results = await getGeocode({ address: r1 });
  //       const latLng = getLatLng(results[0]);
  //       newCoords[InputNames.FROM] = latLng;
  //     }
  //     if (r2) {
  //       handleInput(r2, "type", InputNames.TO);
  //       const results = await getGeocode({ address: r2 });
  //       const latLng = getLatLng(results[0]);
  //       newCoords[InputNames.TO] = latLng;
  //     }
  //     setCoordsToStore(newCoords);
  //   }
  //   updateCoordsByQueryParams();
  // }, [r1, r2]);

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
    // data: Autosuggest.SuggestionSelectedEventData<google.maps.places.AutocompletePrediction>,
    data: Autosuggest.SuggestionSelectedEventData<any>,
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

  React.useMemo(async () => {
    async function updateCoordsByQueryParams() {
      const newCoords: CoordsI = {};
      if (r1) {
        handleInput(r1, "type", InputNames.FROM);
        if (typeof window !== "undefined") {
          const results = await getGeocode({ address: r1 });
          const latLng = getLatLng(results[0]);
          newCoords[InputNames.FROM] = latLng;
        }
      }
      if (r2) {
        handleInput(r2, "type", InputNames.TO);
        if (typeof window !== "undefined") {
          const results = await getGeocode({ address: r2 });
          const latLng = getLatLng(results[0]);
          newCoords[InputNames.TO] = latLng;
        }
      }
      setCoordsToStore(newCoords);
    }
    updateCoordsByQueryParams();
    // updateCoordsByQueryParams({
    //   r1,
    //   r2,
    //   setCoordsToStore,
    //   handleInput,
    // });
  }, [r1, r2]);

  async function handlerGeoCoding(from: string, to: string) {
    try {
      const fromRes = await getGeocode({ address: from });
      console.log("fromRes", fromRes);

      const latLngFrom = getLatLng(fromRes[0]);
      const toRes = await getGeocode({ address: to });
      // TODO: ПОЛУЧЕНИЕ ФОТО НЕДОДЕЛАНО
      // const service = new google.maps.places.PlacesService(
      //   map as google.maps.Map,
      // );
      // service.getDetails({ placeId: toRes[0]?.place_id }, (...a) => {
      //   console.log("XXXXXXXXXXX", a);
      //   a[0]?.photos?.forEach((p) => {
      //     console.log("getUrl", p.getUrl());
      //   });
      // });

      const latLngTo = getLatLng(toRes[0]);
      const coords = {
        [InputNames.FROM]: latLngFrom,
        [InputNames.TO]: latLngTo,
        fromRes,
        toRes,
      };
      setCoordsToStore(coords);
      return coords;
    } catch (error) {
      console.log("handlerGeoCoding ERROR", error);
    }
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
          radioTravelMode &&
            map &&
            maps &&
            coords &&
            directionsRenderer &&
            directionsService &&
            handlerDrawingRoutes(
              map,
              // maps,
              coords,
              radioTravelMode,
              directionsRenderer,
              directionsService,
            );

          // router.pathname.includes("route") &&
          router.push(
            {
              pathname: "/direction",
              query: { r1: firstPointVal, r2: secondPointVal },
            },
            undefined,
            { shallow: true },
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
