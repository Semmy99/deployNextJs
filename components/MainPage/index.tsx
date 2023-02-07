import type { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useStore } from "components/StoreProvider";
import styles from "styles/Home.module.css";
import stylesDistance from "styles/MainPageDistance.module.css";
import stylesHeaderBlock from "styles/MainPageHeaderBlock.module.css";
import { observer } from "mobx-react";

import CustomMap from "components/Maps/CustomMap";
import React from "react";
import { toJS } from "mobx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleMapApi from "components/Maps/GoogleMapApi";
import PlacesAutocomplete from "./PlacesAutocomplete";
import InfoBlock from "./InfoBlock";
import DistanceInfoBlock from "./DistanceInfoBlock";

const MainPage = observer(function Home({
  r1,
  r2,
  a,
}: {
  r1?: string;
  r2?: string;
  a?: any;
}) {
  const {
    MainPageStore: {
      coords,
      setCoordsToStore,
      swapCoordsPlaces,
      saveDistance,
      distance,
      wikiData,
      saveGeoImages,
      imagesGeo,
    },
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
      <Head>
        <title>Главная </title>
        <meta name="description" content="Главная" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      {/* <div
        className={`${styles.headerBackgroundContainer} ${styles.containerHeight}`}
      >
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
      </div> */}
      <section
        className={`${styles.container} ${stylesHeaderBlock.headerContainerHeight}`}
      >
        <div className={stylesHeaderBlock.headerBlockSide}>
          <Image
            src="/logoMainPage.png"
            width={320}
            height={400}
            alt="Фоновое изображение"
            style={{
              objectFit: "cover",
            }}
            quality="100"
            placeholder="empty"
            className={stylesHeaderBlock.headerBlockSideMobilePhone}
            // blurDataURL="/"
          />
          {/* TODO: в этом компоненте при билде падает ошибка google is not defined */}
          <p className={stylesHeaderBlock.headerBlockSubTitle}>
            Живи путешевствуя
          </p>
          <h1 className={stylesHeaderBlock.headerBlockTitle}>
            Маршрут в Стамбул
          </h1>
          <div>
            <PlacesAutocomplete
              r1={r1}
              r2={r2}
              map={map}
              maps={maps}
              saveDistance={saveDistance}
              setCoordsToStore={setCoordsToStore}
              swapCoordsPlaces={swapCoordsPlaces}
              directionsService={directionsService}
              directionsRenderer={directionsRenderer}
              saveGeoImages={saveGeoImages}
            />
          </div>
        </div>
        <div className={stylesHeaderBlock.headerBlockSide}>
          <Image
            src="/logoMainPage.png"
            fill
            alt="Фоновое изображение"
            style={{
              objectFit: "contain",
              maxWidth: 1920,
            }}
            quality="100"
            placeholder="empty"
            // blurDataURL="/"
          />
        </div>
        {/* <button onClick={notify}>Notify!</button> */}

        {/* <button
        onClick={() => {
          directionsRenderer?.setMap(null);
          setCoordsToStore(null);
        }}
        >
        CLEAR
      </button> */}

        {/* <h1 className={styles.mainHeader}>How to get to</h1> */}
      </section>
      <DistanceInfoBlock
        distance={distance}
        wikiData={wikiData}
        r1={r1}
        imagesGeo={imagesGeo}
        r2={r2}
      />
      {/* <GoogleMapApi coords={coords} /> */}
      <CustomMap
        setMaps={(map, maps) => {
          setMap(map);
          setMaps(maps);
          setDirectionsRenderer(new maps.DirectionsRenderer({}));
          setDirectionsService(new maps.DirectionsService());
        }}
        coords={coords}
      />
      {/* {wikiData && JSON.stringify(wikiData)} */}
      <div className={styles.main}>
        <div id="sidebar" className={` ${styles.container} ${styles.sidebar}`}>
          <h2 className={`${styles.subHeader}`}>Описание маршрута</h2>
        </div>
      </div>
    </>
  );
});

export default MainPage;
