// pages/index.js
import Head from 'next/head';
import ClientSideComponent from '../components/ClientSideComponent';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Login/Register Form</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ClientSideComponent />
    </div>
  );
}
