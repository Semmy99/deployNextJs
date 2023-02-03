import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          defer
          // src={`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&libraries=places`}
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC5NIQhbbLpyndiCw4BIeknK7rATZmX3Hk&libraries=places`}
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
