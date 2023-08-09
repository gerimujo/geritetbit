"use client";
import Image from "next/image";
import Page from "./components/componentstructure/page";
import { Provider } from "react-redux";
import store from "./redux/todolist/store";
import type { AppProps } from "next/app";
import { ReduxProvider } from "./redux/todolist/provider";
export default function Home({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Page {...pageProps} />
    </ReduxProvider>
  );
}
