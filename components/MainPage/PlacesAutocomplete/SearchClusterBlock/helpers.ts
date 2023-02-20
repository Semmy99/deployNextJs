import { imagesGeoType, wikiDataType } from "store/MainPageStore";
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
  wikiData: wikiDataType;
  locale: string | undefined;
  setWikiToStore: (wikiData: any) => void;
};

export async function updateCoordsByQueryParams({
  r1,
  r2,
  handleInput,
  setCoordsToStore,
  wikiData,
  setWikiToStore,
  locale = "en",
}: updateCoordsByQueryParamsType) {
  const newCoords: CoordsI = {};
  try {
    const newWikiData = { ...wikiData };
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

    if (!wikiData.from.infoCity && r1) {
      const response = await fetch(`/api/place-data?&place=${r1}l=${locale}`);
      const data = await response.json();
      newWikiData.from.infoCity = data.info;
    }
    if (!wikiData.to.infoCity && r2) {
      const response = await fetch(`/api/place-data?&place=${r2}l=${locale}`);
      const data = await response.json();
      newWikiData.to.infoCity = data.info;
    }
    setWikiToStore(newWikiData);
  } catch (error) {
    console.log("updateCoordsByQueryParams error", error);
  }
}

export async function getPhoto(
  placeIdFrom: string,
  placeIdTo: string,
  map: google.maps.Map,
) {
  const service = new google.maps.places.PlacesService(map as google.maps.Map);
  const imagesData: imagesGeoType = { from: [], to: [] };

  if (placeIdFrom) {
    service.getDetails({ placeId: placeIdFrom }, (...a) => {
      const imagesLink: string[] = [];
      a[0]?.photos?.forEach((p) => {
        const link = p.getUrl();

        if (link) imagesLink.push(link);
      });
      imagesData.from = imagesLink;
    });
  }

  if (placeIdTo) {
    service.getDetails({ placeId: placeIdTo }, (...a) => {
      const imagesLink: string[] = [];
      a[0]?.photos?.forEach((p) => {
        const link = p.getUrl();
        if (link) imagesLink.push(link);
      });
      imagesData.to = imagesLink;
    });
  }

  return imagesData;
}
