import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head />

      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        rel="stylesheet"
      ></link>
      <body className="font-sans bg-slate-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
