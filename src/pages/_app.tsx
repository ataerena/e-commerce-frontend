import MainLayout from "@/layouts/MainLayout";
import "@/styles/globals.css";
import "@/styles/variables.css";
import type { AppProps } from "next/app";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextIntlClientProvider
        locale={useRouter().locale}
        timeZone="Europe/Vienna"
        messages={pageProps.messages}
    >
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </NextIntlClientProvider>
  );
}
