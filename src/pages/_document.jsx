import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      {/* FONTS */}

      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Anta&family=Kdam+Thmor+Pro&family=Kode+Mono:wght@400..700&family=Shippori+Antique&display=swap" rel="stylesheet"></link>
      
      {/* ----- */}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
