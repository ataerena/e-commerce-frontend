import DefaultLayout from "@/layouts/MainLayout";
import "@/styles/globals.css";
import "@/styles/variables.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}
