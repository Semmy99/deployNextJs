import type { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useStore } from "../components/StoreProvider";
import styles from "styles/Home.module.css";
import { observer } from "mobx-react";
import { PostsI } from "../store/PostsStore";
import onestyle from "../components/Index/style.module.scss";
import MyComponentMap from "../components/Maps/MyComponentMap";
import PlacesAutocomplete from "../components/Maps/MyComponentMap/PlacesAutocomplete";

const HomePage = observer(function Home({
  initialState: { data },
  body,
}: {
  initialState: { data: PostsI };
  body: PostsI;
}) {
  const {
    SomeStore: { val, changeVal },
    MainPageStore: { coords },
  } = useStore();
  return (
    <div className={onestyle.body}>
      <Head>
        <title>Главная </title>
        <meta name="description" content="Главная" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <LocationSearchInput /> */}
      <PlacesAutocomplete />

      <main className={styles.main}>
        <h1 className={styles.title}>{data?.title}</h1>
        <MyComponentMap />
        <div className={styles.grid}>
          <Image
            src="/mainBG.webp"
            style={{ zIndex: "-1" }}
            width="100"
            height="100"
            alt="213"
            // placeholder="blur"
            // blurDataURL="/"
          />
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
});

export default HomePage;

export async function getServerSideProps(context: GetServerSideProps) {
  const body = await (
    await fetch("https://jsonplaceholder.typicode.com/todos/1")
  ).json();

  return {
    props: { initialState: { data: body }, body }, // will be passed to the page component as props
  };
}
