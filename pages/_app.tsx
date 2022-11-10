import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

export default function App({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
