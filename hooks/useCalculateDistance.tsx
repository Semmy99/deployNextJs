/*global google*/
import React from "react";
import { LatLng } from "use-places-autocomplete";
// let google: any = {};
// get distance results(

function callbackDefault(
  response: google.maps.DistanceMatrixResponse | null,
  status: google.maps.DistanceMatrixStatus,
  setData: React.Dispatch<React.SetStateAction<dataI>>,
) {
  console.log("response", response);

  if (status != google.maps.DistanceMatrixStatus.OK) {
    console.log("callbackDefault oops");
  } else {
    const origin = response?.originAddresses[0];
    const destination = response?.destinationAddresses[0];
    if (response?.rows[0].elements[0].status === "ZERO_RESULTS") {
      console.log("Better get on a plane. There are no roads between ");
    } else {
      const distance = response?.rows[0].elements[0].distance;
      const duration = response?.rows[0].elements[0].duration;
      // console.log(response?.rows[0].elements[0].distance);
      if (distance?.value && distance?.value) {
        setData({
          km: distance.value / 1000,
          mile: distance.value / 1609.34,
          txt: duration?.text,
          val: duration?.value,
        });
        // const distance_in_kilo = distance?.value / 1000; // the kilom
        // const distance_in_mile = distance.value / 1609.34; // the mile
        // const duration_text = duration?.text;
        // const duration_value = duration?.value;
      }
    }
  }
}

interface useCalculateDistanceI {
  origin:
    | string
    | google.maps.LatLng
    | google.maps.LatLngLiteral
    | google.maps.Place;
  destination:
    | string
    | google.maps.LatLng
    | google.maps.Place
    | google.maps.LatLngLiteral;
  callback?: (
    a: google.maps.DistanceMatrixResponse | null,
    b: google.maps.DistanceMatrixStatus,
    c: any,
  ) => void;
  travelMode?: google.maps.TravelMode;
  unitSystem: google.maps.UnitSystem; // miles and feet.
  avoidHighways?: boolean;
  avoidTolls?: boolean;
}

interface dataI {
  km: number;
  mile: number;
  txt?: string;
  val?: number;
}

const testData = {
  origin: {
    lat: 53.203772,
    lng: 50.1606382,
  },
  destination: {
    lat: 55.755826,
    lng: 37.6173,
  },
};

function useCalculateDistance({
  origin,
  destination,
  callback = callbackDefault,
  travelMode,
  unitSystem,
  avoidHighways = false,
  avoidTolls = false,
}: useCalculateDistanceI) {
  const [data, setData] = React.useState<dataI>();
  console.log("useCalculateDistance", travelMode);

  const service = React.useMemo(() => {
    if (typeof window === "undefined") return null;
    // console.log("google", new google.maps.DistanceMatrixService());
    return google.maps && new google.maps.DistanceMatrixService();
  }, []);
  // console.log("service", service);

  React.useEffect(() => {
    origin &&
      destination &&
      travelMode &&
      service?.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode,
          unitSystem, // miles and feet.
          // unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
          avoidHighways,
          avoidTolls,
        },
        (
          a: google.maps.DistanceMatrixResponse | null,
          b: google.maps.DistanceMatrixStatus,
        ) => callback(a, b, setData),
      );
  }, [origin, destination, service, travelMode]);
  return data;
}

export default useCalculateDistance;
