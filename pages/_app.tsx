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
            <Head><title>WeatherWise</title></Head>
            <Layout >
                <Component {...pageProps} />
            </Layout>
        </Provider >
    </>)
}

export default MyApp;