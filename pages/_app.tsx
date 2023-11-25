import React from 'react';
import MainLayout from '../components/MainLayout';
import '../styles/global.css';

import { wrapper } from '../redux/index';
import Fallback from '../components/error-boundary/Fallback';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
export function App({ Component, pageProps }) {
  return (
    <MainLayout>
      <ErrorBoundary fallback={<Fallback />}>
        <Component {...pageProps} />
      </ErrorBoundary>
    </MainLayout>
  );
}

export default wrapper.withRedux(App);
