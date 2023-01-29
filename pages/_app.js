import '@/styles/globals.css'
import { APP_DESC, APP_NAME } from '@/util/constants'
import Head from 'next/head'
import MainLayout from '../components/MainLayout'

export default function App({ Component, pageProps }) {
  return <MainLayout>
    <Head>
      <title>globe.fil | Onboard to Filecoin with just a few clicks</title>
      <meta name="description" content={APP_DESC} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </MainLayout >
}
