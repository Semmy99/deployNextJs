import { CoordsI } from "components/PlacesAutocomplete/types";
import { action, makeObservable, observable, toJS } from "mobx";
export const MAIN_PAGE_STORE = "MainPageStore";
export default class MainPageStore {
  @observable
  coords: CoordsI | null = null;
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
    console.log("this.coords", toJS(this.coords));

    newCoords.firstPoint = this.coords?.secondPoint;
    newCoords.secondPoint = this.coords?.firstPoint;
    this.coords = newCoords;
  }
}
