import type { AppProps } from "next/app";
import "@styles/styles.scss";
import Layout from "@components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;