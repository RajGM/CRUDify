// pages/index.js
import Head from "next/head";
import ClientSideComponent from "../components/ClientSideComponent";
import { Provider } from "jotai";

export default function Home() {
  return (
    <Provider>
      <div>
        <Head>
          <title>Login/Register Form</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ClientSideComponent />
      </div>
    </Provider>
  );
}