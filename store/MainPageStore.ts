import { InputNames } from "./../components/PlacesAutocomplete/types";
import { CoordsI } from "components/PlacesAutocomplete/types";
import { action, makeObservable, observable, toJS } from "mobx";
import { distanceDataI } from "hooks/useCalculateDistance";
export const MAIN_PAGE_STORE = "MainPageStore";
export default class MainPageStore {
  @observable
  coords: CoordsI | null = null;
  distance: distanceDataI | null = null;
  constructor() {
    makeObservable(this);
  }
  @action.bound
  setCoordsToStore(coords: CoordsI | null) {
    this.coords = coords;
  }
  @action.bound
  swapCoordsPlaces() {
    const newCoords: CoordsI = {};
    newCoords[InputNames.FROM] = this.coords?.[InputNames.TO];
    newCoords[InputNames.TO] = this.coords?.[InputNames.FROM];
    this.coords = newCoords;
  }

  @action.bound
  saveDistance(data: distanceDataI) {
    this.distance = data;
  }
}
