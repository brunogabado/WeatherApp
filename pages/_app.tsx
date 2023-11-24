import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from "react-redux"
import { store } from '@/state/store';
import Layout from '@/components/layout';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider >)
}

export default MyApp;