// Teach Autosuggest how to calculate suggestions for any given input value.
export const getSuggestions = (
  value: string,
  list: google.maps.places.AutocompletePrediction[],
) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : list.filter(
        (d) => d.description.toLowerCase().slice(0, inputLength) === inputValue,
      );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
// suggestion - это данные которые прилетают в  data[]
export const getSuggestionValue = (
  suggestion: google.maps.places.AutocompletePrediction,
) => suggestion?.description || "";
