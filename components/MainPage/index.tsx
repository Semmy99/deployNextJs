import type { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useStore } from "components/StoreProvider";
import styles from "styles/Home.module.css";
import { observer } from "mobx-react";
import PlacesAutocomplete from "components/PlacesAutocomplete";
import CustomMap from "components/Maps/CustomMap";
import React from "react";
import { toJS } from "mobx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainPage = observer(function Home({
  r1,
  r2,
}: {
  r1?: string;
  r2?: string;
}) {
  const {
    MainPageStore: { coords, setCoordsToStore, swapCoordsPlaces },
  } = useStore();

  const [load, setLoad] = React.useState(false);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [maps, setMaps] = React.useState<typeof google.maps | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    React.useState<google.maps.DirectionsRenderer | null>(null);
  const [directionsService, setDirectionsService] =
    React.useState<google.maps.DirectionsService | null>(null);

  React.useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <>
      {" "}
      <div className={styles.headerBackgroundContainer}>
        <Image
          src="/mainBG2.jpg"
          fill
          alt="Фоновое изображение"
          style={{
            objectFit: "cover",
            zIndex: "-1",
            maxWidth: 1920,
          }}
          quality="100"
          placeholder="empty"
          // blurDataURL="/"
        />
      </div>
      <div className={styles.container}>
        {/* <button onClick={notify}>Notify!</button> */}
        <Head>
          <title>Главная </title>
          <meta name="description" content="Главная" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ToastContainer />

        {/* <button
        onClick={() => {
          directionsRenderer?.setMap(null);
          setCoordsToStore(null);
        }}
      >
        CLEAR
      </button> */}
        <h1 className={styles.mainHeader}>How to get to</h1>

        <div className={styles.headerBlock}>
          <div>
            <PlacesAutocomplete
              r1={r1}
              r2={r2}
              map={map}
              maps={maps}
              coords={coords}
              setCoordsToStore={setCoordsToStore}
              swapCoordsPlaces={swapCoordsPlaces}
              directionsRenderer={directionsRenderer}
              directionsService={directionsService}
            />
          </div>
        </div>
      </div>
      {/* <CustomMap
        setMaps={(map, maps) => {
          setMap(map);
          setMaps(maps);
          setDirectionsRenderer(new maps.DirectionsRenderer({}));
          setDirectionsService(new maps.DirectionsService());
        }}
        coords={coords}
      /> */}
      <div className={styles.main}>
        <div id="sidebar"></div>
      </div>
    </>
  );
});

export default MainPage;

export async function getServerSideProps(context: GetServerSideProps) {
  console.log("context", context);

  const body = await (
    await fetch("https://jsonplaceholder.typicode.com/todos/1")
  ).json();

  return {
    props: { initialState: { data: body }, body }, // will be passed to the page component as props
  };
}
