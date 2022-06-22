import type { AppProps } from "next/app";
import "@styles/styles.scss";
import Layout from "@components/Layout";
import { SWRConfig } from "swr";
import { API_URL } from "@utils/constants";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(API_URL + resource, init).then((res) => res.json()),
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;
