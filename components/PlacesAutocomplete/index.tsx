import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import OutsideClickHandler from "react-outside-click-handler";
import Autosuggest from "react-autosuggest";
import React from "react";
import InputAutocomplete from "components/InputAutocomplete";
import Button from "components/Button";
import { useStore } from "components/StoreProvider";
import useCalculateDistance from "hooks/useCalculateDistance";
import {
  SelectedI,
  TransitMode,
  TravelMode,
  UnitSystem,
} from "components/MainPage/types";
import styles from "styles/PlacesAutocomplete.module.css";
import Image from "next/image";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { CoordsI, InputNames } from "./types";
import { handleCoords } from "components/MainPage/helpers";

const PlacesAutocomplete = ({
  r1 = "",
  r2 = "",
  map,
  maps,
  travelMode,
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
  travelMode: google.maps.TravelMode;
  directionsRenderer: google.maps.DirectionsRenderer | null;
  directionsService: google.maps.DirectionsService | null;
  setCoordsToStore: (coords: CoordsI | null) => void;
  swapCoordsPlaces: () => void;
}) => {
  React.useEffect(() => {
    async function updateCoordsByQueryParams() {
      const newCoords: CoordsI = {};
      if (r1) {
        handleInput(r1, "type", InputNames.FIRST_POINT);
        // const result =  getGeocode({ address: r1 }).then((results) => {
        //   const latLng = getLatLng(results[0]);
        //   newCoords[InputNames.FIRST_POINT] = latLng;
        //   // setCoordsToStore({
        //   //   ...(coords || {}),
        //   //   [InputNames.FIRST_POINT]: latLng,
        //   // });
        // });
        const results = await getGeocode({ address: r1 });
        const latLng = getLatLng(results[0]);
        newCoords[InputNames.FIRST_POINT] = latLng;
      }
      if (r2) {
        handleInput(r2, "type", InputNames.SECOND_POINT);
        // getGeocode({ address: r2 }).then((results) => {
        //   console.log("results", results);

        //   const latLng = getLatLng(results[0]);
        //   newCoords[InputNames.SECOND_POINT] = latLng;
        //   // setCoordsToStore({
        //   //   ...(coords || {}),
        //   //   [InputNames.SECOND_POINT]: latLng,
        //   // });
        // });
        const results = await getGeocode({ address: r2 });
        console.log("results", results);

        const latLng = getLatLng(results[0]);
        newCoords[InputNames.SECOND_POINT] = latLng;
        // setCoordsToStore({
        //   ...(coords || {}),
        //   [InputNames.SECOND_POINT]: latLng,
        // });
      }

      console.log("newCoords", newCoords);

      setCoordsToStore(newCoords);
    }
    updateCoordsByQueryParams();
  }, [r1, r2]);

  const {
    ready: firstPointReady,
    value: firstPointVal,
    setValue: firstPointSetVal,
    suggestions: { status: firstPointStatus, data: firstPointData },
    clearSuggestions: firstPointClearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });
  // console.log("firstPointVal", firstPointVal);
  const {
    ready: secondPointReady,
    value: secondPointVal,
    setValue: secondPointSetVal,
    suggestions: { status: secondPointStatus, data: secondPointData },
    clearSuggestions: secondPointClearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const distance = useCalculateDistance({
    origin: firstPointVal,
    destination: secondPointVal,
    // travelMode: google.maps.TravelMode.DRIVING,
    travelMode: TravelMode[travelMode],
    unitSystem: UnitSystem.IMPERIAL,
    transitOpt: {
      modes: [TransitMode.BUS],
    },
  });

  // React.useEffect(() => {
  //   console.log("XXXXXXXXXXXXXXXX");

  //   if (firstPointData.length > 0) {
  //     getGeocode({ address: firstPointData[0].description }).then((results) => {
  //       const latLng = getLatLng(results[0]);

  //       setCoordsToStore({
  //         ...(coords || {}),
  //         [InputNames.FIRST_POINT]: latLng,
  //       });
  //     });
  //   }
  //   if (secondPointData.length > 0) {
  //     getGeocode({ address: secondPointData[0].description }).then(
  //       (results) => {
  //         const latLng = getLatLng(results[0]);
  //         setCoordsToStore({
  //           ...(coords || {}),
  //           [InputNames.SECOND_POINT]: latLng,
  //         });
  //       },
  //     );
  //   }
  //   // console.log(":firstPointData", firstPointData);
  //   // console.log(":secondPointData", secondPointData);
  // }, [firstPointData, secondPointData, coords]);

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
    console.log("data", data);

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
      // setCoords((prev) => {
      //   return { ...(prev || {}), [inputName]: latLng };
      // });
    });
  };
  // console.log("coords", toJS(coords));

  return (
    <>
      <div className={styles.container}>
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
            />
          </div>
        </OutsideClickHandler>
        <div
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
        </div>
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
            />
          </div>
        </OutsideClickHandler>

        <Button
          title="Сохранить координаты  в стор"
          onClick={() => {
            coords?.[InputNames.FIRST_POINT] &&
              coords?.[InputNames.SECOND_POINT] &&
              setCoordsToStore(coords);

            travelMode &&
              map &&
              maps &&
              coords &&
              directionsRenderer &&
              directionsService &&
              handleCoords(
                map,
                maps,
                coords,
                travelMode,
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
      <h3>km {distance?.km}</h3>
      <h3>mile {distance?.mile}</h3>
      <h3>Time {distance?.txt}</h3>
    </>
  );
};

export default observer(PlacesAutocomplete);
