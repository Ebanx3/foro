import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { UserContext } from "@/UserContext";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext>
  );
}
