import Head from "next/head";
import Image from "next/image";
import { useStore } from "components/StoreProvider";
import styles from "styles/MainPage.module.css";
import stylesHeaderBlock from "styles/MainPageHeaderBlock.module.css";
import { observer } from "mobx-react";

import CustomMap from "components/Maps/CustomMap";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlacesAutocomplete from "./PlacesAutocomplete";
import DistanceInfoBlock from "./DistanceInfoBlock";
import LangsSelect from "./LangsSelect";

const MainPage = function Home() {
  const {
    MainPageStore: { coords, distance, wikiData, imagesGeo },
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
      {/* <button
        onClick={() => {
          // directionsRenderer?.setMap(null);
          // setCoordsToStore(null);

          saveRandomNumber(Math.random());
        }}
      >
        CLEAR
      </button> */}
      <LangsSelect />
      <section
        className={`${styles.container} ${stylesHeaderBlock.headerContainerHeight}`}
      >
        <div className={stylesHeaderBlock.headerBlockSide}>
          <Image
            src="/logoMainPage.png"
            width={320}
            height={400}
            alt="Фоновое изображение для мобилок"
            style={{
              objectFit: "cover",
            }}
            quality="100"
            placeholder="empty"
            className={stylesHeaderBlock.headerBlockSideMobilePhone}
            priority
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
              map={map}
              maps={maps}
              directionsService={directionsService}
              directionsRenderer={directionsRenderer}
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
      </section>
      <DistanceInfoBlock
        distance={distance}
        wikiData={wikiData}
        imagesGeo={imagesGeo}
      />
      <div className={styles.mapContainer}>
        <CustomMap
          setMaps={(map, maps) => {
            setMap(map);
            setMaps(maps);
            setDirectionsRenderer(new maps.DirectionsRenderer({}));
            setDirectionsService(new maps.DirectionsService());
          }}
          coords={coords}
        />
        <div
          id="sidebar"
          className={` ${styles.container} ${styles.sidebar} hide`}
        ></div>
      </div>
    </>
  );
};

export default observer(MainPage);
