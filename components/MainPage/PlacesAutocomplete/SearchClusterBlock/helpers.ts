import { getGeocode, getLatLng } from "use-places-autocomplete";
import { CoordsI, InputNames } from "../types";

type updateCoordsByQueryParamsType = {
  r1: string | undefined;
  r2: string | undefined;
  handleInput: (
    txt: string,
    method: "type" | "down" | "up" | "escape" | "enter" | "click",
    inputName: InputNames,
  ) => void;
  setCoordsToStore: (coords: CoordsI | null) => void;
};

export async function updateCoordsByQueryParams({
  r1,
  r2,
  handleInput,
  setCoordsToStore,
}: updateCoordsByQueryParamsType) {
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
