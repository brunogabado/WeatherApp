import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import Layout from "@/components/layout";
import GlobalStyles from "@/GlobalStyles";
import HydrationZustand from "@/components/HydrationComponent";
import Head from "next/head";
import { Helmet } from "react-helmet";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&family=Pacifico&family=Quicksand:wght@400;600&display=swap"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Playfair+Display&display=swap" />
      </Helmet>
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
