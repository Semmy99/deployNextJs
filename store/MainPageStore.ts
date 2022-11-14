import { CoordsI } from "components/Maps/CustomMap/PlacesAutocomplete";
import { action, makeObservable, observable } from "mobx";
export const MAIN_PAGE_STORE = "MainPageStore";
export default class MainPageStore {
  @observable
  coords: CoordsI | null = null;
  constructor() {
    makeObservable(this);
  }
  @action.bound
  setCoordsToStore(coords: CoordsI) {
    this.coords = coords;
  }
}
