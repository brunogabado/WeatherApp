import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from "react-redux"
import { store } from '@/state/store';
import Layout from '@/components/layout';
import GlobalStyles from '@/GlobalStyles';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    return (<>
        <GlobalStyles />
        <Provider store={store}>
            <Head>
                <title>WeatherWise</title>
                <link rel="icon" href="favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com"  />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
                />
            </Head>
            <Layout >
                <Component {...pageProps} />
            </Layout>
        </Provider >
    </>)
}



export default MyApp;