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

export enum InputNames {
  FIRST_POINT = "firstPoint",
  SECOND_POINT = "secondPoint",
}

export type CoordsI = {
  firstPoint?: {
    lat: number;
    lng: number;
  };
  secondPoint?: {
    lat: number;
    lng: number;
  };
};

const PlacesAutocomplete = () => {
  const {
    ready: firstPointReady,
    value: firstPointVal,
    suggestions: { status: firstPointStatus, data: firstPointData },
    setValue: firstPointSetVal,
    clearSuggestions: firstPointClearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });
  const {
    ready: secondPointReady,
    value: secondPointVal,
    suggestions: { status: secondPointStatus, data: secondPointData },
    setValue: secondPointSetVal,
    clearSuggestions: secondPointClearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const {
    MainPageStore: { setCoordsToStore },
  } = useStore();

  const [coords, setCoords] = React.useState<CoordsI>();
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
      setCoords((prev) => {
        return { ...(prev || {}), [inputName]: null };
      });
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
      const { lat, lng } = getLatLng(results[0]);
      setCoords((prev) => {
        return { ...(prev || {}), [inputName]: { lat, lng } };
      });
    });
  };

  return (
    <>
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
            inputName={InputNames.FIRST_POINT}
          />
        </div>
      </OutsideClickHandler>
      <OutsideClickHandler onOutsideClick={secondPointClearSuggestions}>
        <div>
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
      <h2>firstPoint</h2>
      <p>
        <b>lat - </b>
        {coords?.firstPoint?.lat || ""} <b>lng</b>{" "}
        {coords?.firstPoint?.lng || ""}
      </p>
      <h2>secondPoint</h2>
      <p>
        <b>lat - </b> {coords?.secondPoint?.lat || ""} <b>lng</b>{" "}
        {coords?.secondPoint?.lng || ""}
      </p>
      <Button
        title="Сохранить координаты  в стор"
        onClick={() => {
          coords?.[InputNames.FIRST_POINT] &&
            coords?.[InputNames.SECOND_POINT] &&
            setCoordsToStore(coords);
        }}
        disabled={
          !coords?.[InputNames.FIRST_POINT] ||
          !coords?.[InputNames.SECOND_POINT]
        }
      />
    </>
  );
};

export default PlacesAutocomplete;
