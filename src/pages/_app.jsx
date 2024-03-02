import MainLayout from "@/layouts/MainLayout";
import "@/styles/globals.css";
import "@/styles/variables.css";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


export default function App({ Component, pageProps }) {
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
