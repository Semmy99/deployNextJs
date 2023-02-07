import { action, makeObservable, observable, toJS } from "mobx";
import { distanceDataI } from "hooks/useCalculateDistance";
import {
  CoordsI,
  InputNames,
} from "components/MainPage/PlacesAutocomplete/types";
export const MAIN_PAGE_STORE = "MainPageStore";

export type wikiDataType = {
  from: {
    infoCity: string;
    query: { pages: any };
  };
  to: {
    infoCity: string;
    query: { pages: any };
  };
};

export type imagesGeoType = { from: string[]; to: string[] } | null;
export default class MainPageStore {
  @observable
  coords: CoordsI | null = null;
  distance: distanceDataI | null = null;
  wikiData: wikiDataType;
  imagesGeo: imagesGeoType;

  constructor(initData?: any) {
    this.wikiData = initData || null;
    this.imagesGeo = null;
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
  @action.bound
  saveGeoImages(images: imagesGeoType) {
    this.imagesGeo = images;
  }
}
