import type { AppProps } from "next/app";
import "@styles/styles.scss";
import Layout from "@components/Layout";
import { SWRConfig } from "swr";
import { API_URL } from "@utils/constants";
import AuthProvider from "@components/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(API_URL + resource, init).then((res) => res.json()),
      }}
    >
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </SWRConfig>
  );
}

export default MyApp;
