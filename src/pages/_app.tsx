import '@/styles/globals.css'

import type { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="HangLoose! It's a new way to connect with other developers. Check it out!" />
        <title>HangLoose</title>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
