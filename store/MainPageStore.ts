import { makeAutoObservable, observable, runInAction } from "mobx";
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
const defQueryParams = { r1: "", r2: "" };
export type imagesGeoType = { from?: string[]; to?: string[] } | null;
export default class MainPageStore {
  @observable
  coords: CoordsI | null = null;

  @observable
  distance: distanceDataI | null = null;

  @observable
  wikiData: wikiDataType;

  @observable
  imagesGeo: imagesGeoType = null;

  @observable
  pathName = typeof window !== "undefined" ? window?.location?.pathname : "";
  @observable
  queryParams = defQueryParams;

  @observable
  polylines: google.maps.Polyline[] = [];

  @observable
  markers: google.maps.Marker[] = [];

  @observable
  randomNumber = 0;

  constructor(initData?: any) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.wikiData = initData || null;
    this.queryParams = initData?.queryParams || defQueryParams;
  }

  setCoordsToStore(coords: CoordsI | null) {
    this.coords = coords;
  }
  setWikiToStore(wikiData: any) {
    this.wikiData = wikiData;
  }

  swapCoordsPlaces() {
    const newCoords: CoordsI = {};
    newCoords[InputNames.FROM] = this.coords?.[InputNames.TO];
    newCoords[InputNames.TO] = this.coords?.[InputNames.FROM];
    this.coords = newCoords;
  }

  saveDistance(data: distanceDataI) {
    this.distance = data;
  }
  // TODO: Удалить
  saveGeoImages(images: imagesGeoType) {
    runInAction(() => {
      this.imagesGeo = images;
    });
  }

  saveGeoImages1(map: google.maps.Map, placeId: string, key: "from" | "to") {
    runInAction(() => {
      const service = new google.maps.places.PlacesService(
        map as google.maps.Map,
      );

      if (placeId) {
        service.getDetails({ placeId }, (...a) => {
          const imagesLink: string[] = [];
          a[0]?.photos?.forEach((p) => {
            const link = p.getUrl();

            if (link) imagesLink.push(link);
          });
          const img = { [key]: imagesLink };

          this.imagesGeo = { ...this.imagesGeo, ...img };
        });
      }
    });
  }

  saveRandomNumber(n: number) {
    console.log("saveRandomNumber", n);

    this.randomNumber = n;
  }

  setPathName(url: string) {
    this.pathName = url;
  }

  setQueryParams(queryParams: { r1: string; r2: string }) {
    this.queryParams = queryParams;
  }

  savePolylinesCoord(data: google.maps.Polyline[]) {
    this.polylines = data;
  }

  saveMarkersCoord(markers: google.maps.Marker[]) {
    this.markers = markers;
  }
}
