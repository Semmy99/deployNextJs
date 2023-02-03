import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StoreProvider } from "../components/StoreProvider";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider {...pageProps}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default appWithTranslation(MyApp);
