import React, { memo } from "react";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import styles from "styles/InputAutocomplete.module.css";
import { getSuggestionValue } from "./helpers";
import { ClearSuggestions } from "use-places-autocomplete";
import { InputNames } from "../types";

// Use your imagination to render suggestions.
function renderSuggestion(
  suggestion: google.maps.places.AutocompletePrediction,
  data: { isHighlighted: boolean; query: string },
) {
  const matches = match(suggestion.description, data.query);
  const parts = parse(suggestion.description, matches);

  return (
    <span>
      {parts.map((part, index) => {
        return (
          // <span className={part.highlight ? styles.highlight : ""} key={index}>
          <span
            className={part.highlight ? styles.autocompleteContainer : ""}
            key={index}
          >
            {part.text}
          </span>
        );
      })}
    </span>
  );
}

interface InputAutocompleteI {
  handleInput: (
    txt: string,
    method: "type" | "down" | "up" | "escape" | "enter" | "click",
    inputName: InputNames,
  ) => void;
  value: string;
  suggestions: google.maps.places.AutocompletePrediction[];
  handleSelect: (
    e: React.FormEvent<any>,
    description: Autosuggest.SuggestionSelectedEventData<google.maps.places.AutocompletePrediction>,
    inputName: InputNames,
  ) => void;
  disabled?: boolean;
  clearSuggestions: ClearSuggestions;
  inputName: InputNames;
  placeholder: string;
}

const InputAutocomplete: React.FC<InputAutocompleteI> = ({
  handleInput,
  value,
  handleSelect,
  disabled,
  suggestions,
  clearSuggestions,
  inputName,
  placeholder = "",
}) => {
  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({
    value,
    reason,
  }: {
    value: string;
    reason: string;
  }) => {
    // console.log("onSuggestionsFetchRequested", reason);
  };

  return (
    <div className={styles.autocompleteContainer}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={clearSuggestions}
        onSuggestionSelected={(e, data) => {
          handleSelect(e, data, inputName);
        }}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder,
          value,
          onChange: (e, { newValue, method }) => {
            handleInput(newValue, method, inputName);
          },
          disabled,
        }}
      />
    </div>
  );
};

export default memo(InputAutocomplete);
