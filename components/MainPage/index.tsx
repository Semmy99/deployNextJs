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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleMapApi from "components/Maps/GoogleMapApi";

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
      <div
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
      </div>
      <div className={`${styles.container} ${styles.containerHeight}`}>
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
        {/* TODO: в этом компоненте при билде падает ошибка google is not defined */}
        <div className={styles.headerBlock}>
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
          />
        </div>
      </div>
      <div className={`${styles.container} ${styles.routeInfoBlock}`}>
        <h2 className={`${styles.subHeader}`}>Информация о маршруте</h2>
        <div className={`${styles.distanceFieldContainer}`}>
          <div className={`${styles.distanceFieldBlock}`}>
            <p className={`${styles.distanceFieldHeader}`}>Расстояние в км</p>
            <p className={`${styles.distanceVal}`}>
              {" "}
              {Math.floor(distance?.km || 0) || "-"}{" "}
            </p>
          </div>
          <div className={`${styles.distanceFieldBlock}`}>
            <p className={`${styles.distanceFieldHeader}`}>
              Расстояние в милях
            </p>
            <p className={`${styles.distanceVal}`}>
              {" "}
              {Math.floor(distance?.mile || 0) || "-"}{" "}
            </p>
          </div>
          <div className={`${styles.distanceFieldBlock}`}>
            <p className={`${styles.distanceFieldHeader}`}>Время</p>
            <p className={`${styles.distanceVal}`}> {distance?.txt || "-"} </p>
          </div>
        </div>
        <div className={`${styles.geoIUmagesContainer}`}>
          <div className={`${styles.geoImageGeoContainer}`}>
            <p className={`${styles.geoImageGeoHeader}`}>Samara</p>
            <div className={`${styles.geoImages}`}>
              <div className={`${styles.geoImage}`}>
                <Image
                  src="/mainBG3.jpg"
                  // fill
                  alt="Фоновое изображение"
                  width={200}
                  height={200}
                  style={{
                    objectFit: "cover",
                    zIndex: "-1",
                    // maxWidth: 1920,
                  }}
                  quality="100"
                  placeholder="empty"
                  // blurDataURL="/"
                />
              </div>
              <div className={`${styles.geoImage}`}>
                <Image
                  src="/mainBG3.jpg"
                  // fill
                  alt="Фоновое изображение"
                  width={200}
                  height={200}
                  style={{
                    objectFit: "cover",
                    zIndex: "-1",
                    // maxWidth: 1920,
                  }}
                  quality="100"
                  placeholder="empty"
                  // blurDataURL="/"
                />
              </div>
              <div className={`${styles.geoImage}`}>
                <Image
                  src="/mainBG3.jpg"
                  // fill
                  alt="Фоновое изображение"
                  width={200}
                  height={200}
                  style={{
                    objectFit: "cover",
                    zIndex: "-1",
                    // maxWidth: 1920,
                  }}
                  quality="100"
                  placeholder="empty"
                  // blurDataURL="/"
                />
              </div>
              <div className={`${styles.geoImage}`}>
                <Image
                  src="/mainBG3.jpg"
                  // fill
                  alt="Фоновое изображение"
                  width={200}
                  height={200}
                  style={{
                    objectFit: "cover",
                    zIndex: "-1",
                    // maxWidth: 1920,
                  }}
                  quality="100"
                  placeholder="empty"
                  // blurDataURL="/"
                />
              </div>
              <div className={`${styles.geoImage}`}>
                <Image
                  src="/mainBG3.jpg"
                  // fill
                  alt="Фоновое изображение"
                  width={200}
                  height={200}
                  style={{
                    objectFit: "cover",
                    zIndex: "-1",
                    // maxWidth: 1920,
                  }}
                  quality="100"
                  placeholder="empty"
                  // blurDataURL="/"
                />
              </div>
              <div className={`${styles.geoImage}`}>
                <Image
                  src="/mainBG3.jpg"
                  // fill
                  alt="Фоновое изображение"
                  width={200}
                  height={200}
                  style={{
                    objectFit: "cover",
                    zIndex: "-1",
                    // maxWidth: 1920,
                  }}
                  quality="100"
                  placeholder="empty"
                  // blurDataURL="/"
                />
              </div>
              <div className={`${styles.geoImage}`}>
                <Image
                  src="/mainBG3.jpg"
                  // fill
                  alt="Фоновое изображение"
                  width={200}
                  height={200}
                  style={{
                    objectFit: "cover",
                    zIndex: "-1",
                    // maxWidth: 1920,
                  }}
                  quality="100"
                  placeholder="empty"
                  // blurDataURL="/"
                />
              </div>
              <div className={`${styles.geoImage}`}>
                <Image
                  src="/mainBG3.jpg"
                  // fill
                  alt="Фоновое изображение"
                  width={200}
                  height={200}
                  style={{
                    objectFit: "cover",
                    zIndex: "-1",
                    // maxWidth: 1920,
                  }}
                  quality="100"
                  placeholder="empty"
                  // blurDataURL="/"
                />
              </div>
              <div className={`${styles.geoImage}`}>
                <Image
                  src="/mainBG3.jpg"
                  // fill
                  alt="Фоновое изображение"
                  width={200}
                  height={200}
                  style={{
                    objectFit: "cover",
                    zIndex: "-1",
                    // maxWidth: 1920,
                  }}
                  quality="100"
                  placeholder="empty"
                  // blurDataURL="/"
                />
              </div>
              <div className={`${styles.geoImage}`}>
                <Image
                  src="/mainBG3.jpg"
                  // fill
                  alt="Фоновое изображение"
                  width={200}
                  height={200}
                  style={{
                    objectFit: "cover",
                    zIndex: "-1",
                    // maxWidth: 1920,
                  }}
                  quality="100"
                  placeholder="empty"
                  // blurDataURL="/"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
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

      <div className={styles.main}>
        <div id="sidebar" className={` ${styles.container} ${styles.sidebar}`}>
          <h2 className={`${styles.subHeader}`}>Описание маршрута</h2>
        </div>
      </div>
    </>
  );
});

export default MainPage;
