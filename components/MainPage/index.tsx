import type { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useStore } from "components/StoreProvider";
import styles from "styles/Home.module.css";
import { observer } from "mobx-react";
import { PostsI } from "store/PostsStore";
import onestyle from "../components/Index/style.module.scss";
import PlacesAutocomplete from "components/PlacesAutocomplete";
import { CoordsI } from "components/PlacesAutocomplete/types";
import CustomMap from "components/Maps/CustomMap";
import React from "react";
import Select from "react-select";
import { toJS } from "mobx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SelectedI, TravelMode } from "./types";
import { handleCoords, options } from "./helpers";

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
  // const notify = () => toast("Wow so easy!");

  const [selectedOption, setSelectedOption] = React.useState<SelectedI>({
    value: TravelMode.DRIVING,
    label: "на мищинэ",
  });
  const [load, setLoad] = React.useState(false);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [maps, setMaps] = React.useState<typeof google.maps | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    React.useState<google.maps.DirectionsRenderer | null>(null);
  const [directionsService, setDirectionsService] =
    React.useState<google.maps.DirectionsService | null>(null);

  // React.useEffect(() => {
  //   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

  //   selectedOption &&
  //     map &&
  //     maps &&
  //     coords &&
  //     directionsRenderer &&
  //     directionsService &&
  //     handleCoords(
  // map,
  // maps,
  // coords,
  // selectedOption.value,
  // directionsRenderer,
  // directionsService,
  //     );
  // }, [coords, map, maps, selectedOption]);

  React.useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <>
      {/* <button onClick={notify}>Notify!</button> */}
      <Head>
        <title>Главная </title>
        <meta name="description" content="Главная" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      <button
        onClick={() => {
          directionsRenderer?.setMap(null);
          setCoordsToStore(null);
        }}
      >
        CLEAR
      </button>
      <div className={styles.headerBlock}>
        {/* <div className={styles.formBlock}> */}
        {/* <div className={styles.headerBackgroundContainer}>
          <Image
            src="/mainBG1.png"
            fill
            alt="Фоновое изображение"
            style={{
              objectFit: "cover",
              zIndex: "-1",
            }}
            quality="100"
            placeholder="empty"
            // blurDataURL="/"
          />
        </div> */}
        <div>
          <PlacesAutocomplete
            travelMode={selectedOption?.value}
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
          {load && (
            <Select
              defaultValue={selectedOption}
              onChange={(a) => setSelectedOption(a as SelectedI)}
              options={options}
              id="1"
              className=""
            />
          )}
        </div>
      </div>
      <main className={styles.main}>
        {/* <h1 className={styles.title}>{data?.title}</h1> */}
        <CustomMap
          setMaps={(map, maps) => {
            setMap(map);
            setMaps(maps);
            setDirectionsRenderer(new maps.DirectionsRenderer({}));
            setDirectionsService(new maps.DirectionsService());
          }}
          coords={coords}
        />
        <div id="sidebar"></div>
      </main>
      <footer className={styles.footer}></footer>
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
