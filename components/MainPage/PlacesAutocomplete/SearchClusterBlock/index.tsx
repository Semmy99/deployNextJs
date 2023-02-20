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
import { observer } from "mobx-react-lite";
import { useStore } from "components/StoreProvider";
import { getCityInfoByWiki } from "components/wikiHelpers";

function SearchClusterBlock({
  radioTravelMode,
  map,
  maps,
  directionsRenderer,
  directionsService,
}: SearchClusterBlockType) {
  const router = useRouter();
  const { r1, r2 } = router.query;
  const {
    MainPageStore: {
      coords,
      setCoordsToStore,
      swapCoordsPlaces,
      saveDistance,
      distance,
      wikiData,
      saveGeoImages,
      imagesGeo,
      randomNumber,
      saveRandomNumber,
      saveGeoImages1,
      setQueryParams,
      setWikiToStore,
      savePolylinesCoord,
      polylines,
      saveMarkersCoord,
      markers,
    },
  } = useStore();

  const {
    ready: firstPointReady,
    value: firstPointVal,
    setValue: firstPointSetVal,
    suggestions: { status: firstPointStatus, data: firstPointData },
    clearSuggestions: firstPointClearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 500,
  });

  const {
    ready: secondPointReady,
    value: secondPointVal,
    setValue: secondPointSetVal,
    suggestions: { status: secondPointStatus, data: secondPointData },
    clearSuggestions: secondPointClearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 500,
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
            maps,
            coords,
            radioTravelMode,
            directionsRenderer,
            directionsService,
            savePolylinesCoord,
            polylines,
            saveMarkersCoord,
            markers,
          );

        updateCoordsByQueryParams({
          r1: r1 as string,
          r2: r2 as string,
          setCoordsToStore,
          handleInput,
          wikiData,
          setWikiToStore,
          locale: router.locale,
        });
      }
    }
    firstRender();
  }, [map]);

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

  async function handlerGeoCoding(from: string, to: string) {
    // console.log("handlerGeoCoding");

    try {
      const fromRes = await getGeocode({ address: from });
      const toRes = await getGeocode({ address: to });
      const latLngFrom = getLatLng(fromRes[0]);
      const latLngTo = getLatLng(toRes[0]);

      // TODO: ПОЛУЧЕНИЕ ФОТО НЕДОДЕЛАНО
      if (map) {
        saveGeoImages1(map, fromRes[0]?.place_id, "from");
        saveGeoImages1(map, toRes[0]?.place_id, "to");
      }
      //-----------------------------------------------------------------
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
      {/* {randomNumber}

      <button
        onClick={() => {
          // directionsRenderer?.setMap(null);
          // setCoordsToStore(null);

          saveRandomNumber(Math.random());
        }}
      >
        CLEAR
      </button> */}
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
              value={firstPointVal || (r1 as string) || ""}
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
            width={30}
            height={30}
            // blurDataURL="/"
          />
        </span>
        <OutsideClickHandler onOutsideClick={secondPointClearSuggestions}>
          <div>
            <InputAutocomplete
              handleInput={handleInput}
              value={secondPointVal || (r2 as string) || ""}
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
        title="Поиск"
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
              maps,
              coords,
              radioTravelMode,
              directionsRenderer,
              directionsService,
              savePolylinesCoord,
              polylines,
              saveMarkersCoord,
              markers,
            );
          let url = new URL(window.location.href);
          if (!url.toString().includes("direction")) {
            url = new URL(`${window.location.href}/direction`);
          }
          url.searchParams.set("r1", firstPointVal);
          url.searchParams.set("r2", secondPointVal);
          setQueryParams({ r1: firstPointVal, r2: secondPointVal });
          window.history.pushState({}, "direction", url.toString());
          const descrCityFrom = await getCityInfoByWiki(
            firstPointVal,
            router.locale,
          );
          const descrCityTo = await getCityInfoByWiki(
            secondPointVal,
            router.locale,
          );

          setWikiToStore({
            [InputNames.FROM]: descrCityFrom,
            [InputNames.TO]: descrCityTo,
          });
        }}
        disabled={!firstPointVal || !secondPointVal}
        // disabled={!coords?.[InputNames.FROM] || !coords?.[InputNames.TO]}
        className={styles.btn}
      />
    </div>
  );
}

export default observer(SearchClusterBlock);
