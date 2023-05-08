import Head from 'next/head'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--inter-font',
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export default function MyApp({  Component,  pageProps: { session, ...pageProps },}) {

  
  return (
    <div className={inter.className}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      <SessionProvider session={session}>
          <Component {...pageProps} />
      </SessionProvider>
    </div>
  )
}


