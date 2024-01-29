import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import Layout from "@/components/layout";
import GlobalStyles from "@/GlobalStyles";
import HydrationZustand from "@/components/HydrationComponent";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <Head>
          <title>WeatherWise</title>
          <link rel="icon" href="favicon.ico" />
        </Head>
        <HydrationZustand>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </HydrationZustand>
      </Provider>
    </>
  );
}

export default MyApp;
