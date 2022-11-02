import { CoordsI } from "components/Maps/MyComponentMap/PlacesAutocomplete";
import { action, makeObservable, observable, runInAction } from "mobx";
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
