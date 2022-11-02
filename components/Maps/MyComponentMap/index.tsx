import { GetServerSideProps } from "next";
import React from "react";
import GoogleMapReact from "google-map-react";
import { useStore } from "components/StoreProvider";

const AnyReactComponent = ({ text }: any) => (
  <div style={{ color: "red" }}>{text}</div>
);
const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const defaultCenter = {
  lat: 36.1774465,
  lng: -86.7042552,
};

function MyComponentMap() {
  const [loaded, setLoaded] = React.useState(false);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const {
    MainPageStore: { coords },
  } = useStore();
  console.log("coords", coords);
  const defaultProps = {
    center: {
      lat: 53.203772,
      lng: 50.1606382,
    },
    zoom: 11,
  };

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      {loaded && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultProps.center || coords}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={coords?.firstPoint || 53.203772}
            lng={coords?.secondPoint || 50.1606382}
            text="My MarkerRRRRRRRRRRRRRRRRRRRRRRRRRR"
          />
        </GoogleMapReact>
      )}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSideProps) {
  const body = await (
    await fetch("https://jsonplaceholder.typicode.com/todos/1")
  ).json();

  return {
    props: { initialState: { data: body }, body }, // will be passed to the page component as props
  };
}

export default React.memo(MyComponentMap);
