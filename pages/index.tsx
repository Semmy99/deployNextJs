import type { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useStore } from "../components/StoreProvider";
import styles from "../styles/Home.module.css";
import { observer } from "mobx-react";
import { PostsI } from "../store/PostsStore";
import onestyle from "../components/Index/style.module.scss";

const HomePage = observer(function Home({
  initialState: { data },
  body,
}: {
  initialState: { data: PostsI };
  body: PostsI;
}) {
  const {
    SomeStore: { val, changeVal },
  } = useStore();

  return (
    <div className={onestyle.body}>
      <Head>
        <title>Главная</title>
        <meta name="description" content="Главная" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <input
        type="text"
        value={val || data?.title}
        onChange={(e) => changeVal(e?.target?.value)}
      />
      <main className={styles.main}>
        <h1 className={styles.title}>{data?.title}</h1>

        <div className={styles.grid}>
          {/* <Image
            src="/mainBG.webp"
            layout="responsive"
            style={{ zIndex: "-1" }}
            width="100%"
            height="100%"
            // placeholder="blur"
            // blurDataURL="/"
          /> */}
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
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
