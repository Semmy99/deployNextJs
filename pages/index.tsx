import MainPage from "components/MainPage";

const HomePage = () => <MainPage />;
// import type { GetServerSideProps } from "next";
// import Head from "next/head";
// import Image from "next/image";
// import { useStore } from "../components/StoreProvider";
// import styles from "styles/Home.module.css";
// import { observer } from "mobx-react";
// import { PostsI } from "../store/PostsStore";
// import onestyle from "../components/Index/style.module.scss";
// import PlacesAutocomplete, { CoordsI } from "components/PlacesAutocomplete";
// import CustomMap from "components/Maps/CustomMap";
// import React from "react";
// import Select from "react-select";
// import { toJS } from "mobx";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export enum TravelMode {
//   BICYCLING = "BICYCLING",
//   DRIVING = "DRIVING",
//   TRANSIT = "TRANSIT",
//   TWO_WHEELER = "TWO_WHEELER",
//   WALKING = "WALKING",
// }

// export enum TransitMode {
//   /**
//    * Specifies bus as a preferred mode of transit.
//    */
//   BUS = "BUS",
//   /**
//    * Specifies rail as a preferred mode of transit.
//    */
//   RAIL = "RAIL",
//   /**
//    * Specifies subway as a preferred mode of transit.
//    */
//   SUBWAY = "SUBWAY",
//   /**
//    * Specifies train as a preferred mode of transit.
//    */
//   TRAIN = "TRAIN",
//   /**
//    * Specifies tram as a preferred mode of transit.
//    */
//   TRAM = "TRAM",
// }
// const options = [
//   {
//     value: TravelMode.TRANSIT,
//     label: "TRANSIT",
//   },
//   {
//     value: TravelMode.BICYCLING,
//     label: "Велосипед нах",
//   },
//   { value: TravelMode.DRIVING, label: "на мищинэ" },
//   {
//     value: TravelMode.WALKING,
//     label: "Топ топ ножками",
//   },
// ];
// export enum UnitSystem {
//   IMPERIAL = 0.0,
//   METRIC = 1.0,
// }
// export interface SelectedI {
//   value: TravelMode;
//   label: string;
// }

// async function handlerDrawingRoutes(
//   map: google.maps.Map,
//   maps: typeof google.maps,
//   coords: CoordsI,
//   selectedOption: google.maps.TravelMode,
//   directionsRenderer: google.maps.DirectionsRenderer,
//   directionService: google.maps.DirectionsService,
// ) {
//   if (!coords.firstPoint || !coords.secondPoint) return;
//   try {
//     // Нужн найти дистанцию. и время
//     if (maps && typeof maps.DirectionsRenderer === "function") {
//       // clean previous directions rendered to the map;
//       // const directionsRenderer = new maps.DirectionsRenderer({});
//       // const directionService = new maps.DirectionsService();
//       const directionsResult = await directionService.route({
//         origin: {
//           lat: coords.firstPoint?.lat as number,
//           lng: coords.firstPoint?.lng as number,
//         },
//         destination: {
//           lat: coords.secondPoint?.lat as number,
//           lng: coords.secondPoint?.lng as number,
//         },
//         travelMode: selectedOption,
//       });
//       directionsRenderer.setDirections(directionsResult);
//       console.log("AAAA", document.getElementById("sidebar"));
//       directionsRenderer.setPanel(
//         document.getElementById("sidebar") as HTMLElement,
//       );

//       toast.success("Маршрут отрисован");

//       console.log("directionsResult", directionsResult);

//       // directionsRenderer.setOptions({});
//       directionsRenderer.setMap(map);
//     }
//     // const routePolyline =
//     //   new google.maps.Polyline(/* options: google.maps.PolylineOptions */);
//     // routePolyline.setMap(map);
//   } catch (error) {
//     console.log("error", error);
//     toast.error("AAAAAAAAAAAAAAAAA ОШИБКА");
//   }
// }

// const HomePage = observer(function Home({
//   initialState: { data },
// }: {
//   initialState: { data: PostsI };
// }) {
//   const {
//     MainPageStore: { coords, setCoordsToStore },
//   } = useStore();
//   // const notify = () => toast("Wow so easy!");

//   const [selectedOption, setSelectedOption] = React.useState<SelectedI>({
//     value: TravelMode.DRIVING,
//     label: "на мищинэ",
//   });
//   const [load, setLoad] = React.useState(false);
//   const [map, setMap] = React.useState<google.maps.Map | null>(null);
//   const [maps, setMaps] = React.useState<typeof google.maps | null>(null);
//   const [directionsRenderer, setDirectionsRenderer] =
//     React.useState<google.maps.DirectionsRenderer | null>(null);
//   const [directionsService, setDirectionsService] =
//     React.useState<google.maps.DirectionsService | null>(null);

//   React.useEffect(() => {
//     selectedOption &&
//       map &&
//       maps &&
//       coords &&
//       directionsRenderer &&
//       directionsService &&
//       handlerDrawingRoutes(
//         map,
//         maps,
//         coords,
//         selectedOption.value,
//         directionsRenderer,
//         directionsService,
//       );
//   }, [coords, map, maps, selectedOption]);

//   React.useEffect(() => {
//     setLoad(true);
//   }, []);

//   return (
//     <>
//       {/* <button onClick={notify}>Notify!</button> */}
//       <Head>
//         <title>Главная </title>
//         <meta name="description" content="Главная" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <ToastContainer />
//       <button
//         onClick={() => {
//           directionsRenderer?.setMap(null);
//           setCoordsToStore(null);
//         }}
//       >
//         CLEAR
//       </button>
//       <div className={styles.headerBlock}>
//         {/* <div className={styles.formBlock}> */}
//         <div className={styles.headerBackgroundContainer}>
//           <Image
//             src="/mainBG1.png"
//             fill
//             alt="Фоновое изображение"
//             style={{
//               objectFit: "cover",
//               zIndex: "-1",
//             }}
//             quality="100"
//             placeholder="empty"
//             // blurDataURL="/"
//           />
//         </div>
//         <div>
//           <PlacesAutocomplete travelMode={selectedOption?.value} />
//           {load && (
//             <Select
//               defaultValue={selectedOption}
//               onChange={(a) => setSelectedOption(a as SelectedI)}
//               options={options}
//               id="1"
//               className=""
//             />
//           )}
//         </div>
//       </div>
//       <main className={styles.main}>
//         {/* <h1 className={styles.title}>{data?.title}</h1> */}
//         <CustomMap
//           setMaps={(map, maps) => {
//             setMap(map);
//             setMaps(maps);
//             setDirectionsRenderer(new maps.DirectionsRenderer({}));
//             setDirectionsService(new maps.DirectionsService());
//           }}
//           coords={coords}
//         />
//         <div id="sidebar"></div>
//       </main>
//       <footer className={styles.footer}></footer>
//     </>
//   );
// });

export default HomePage;

// export async function getServerSideProps(context: GetServerSideProps) {
//   console.log("context", context);

//   const body = await (
//     await fetch("https://jsonplaceholder.typicode.com/todos/1")
//   ).json();

//   return {
//     props: { initialState: { data: body }, body }, // will be passed to the page component as props
//   };
// }
