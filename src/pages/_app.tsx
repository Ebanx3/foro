import "@/styles/globals.css";
import { UserContext } from "@/UserContext";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Un sitio web donde buscar y compartir información sobre desarrollo de software"
        />
      </Head>
      <UserContext>
        <Component {...pageProps} />
      </UserContext>
    </>
  );
}
