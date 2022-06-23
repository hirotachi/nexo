import type { AppProps } from "next/app";
import "@styles/styles.scss";
import Layout from "@components/Layout";
import { SWRConfig } from "swr";
import { API_URL } from "@utils/constants";
import AuthProvider from "@components/AuthProvider";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
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
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </SWRConfig>
  );
}

export default MyApp;
