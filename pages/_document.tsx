import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props: any) {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,500&display=swap"
          rel="stylesheet"
        />
        <script
          defer
          // src={`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&libraries=places`}
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC5NIQhbbLpyndiCw4BIeknK7rATZmX3Hk&libraries=places&language=${
            props.locale || "en"
          }`}
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
