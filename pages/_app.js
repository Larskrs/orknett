import Head from 'next/head'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import AktueltTVLoading from '../components/AktueltTVLoading'
import localFont from "next/font/local"

const Bricolage = localFont({ 
  src: "../fonts/Bricolage.ttf",
  variable: '--bricolage',
})
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin', 'latin-ext'],
  variable: '--inter-font',
  weight: ["100", "300", "400", "500", "700", "900"]
})
 

export default function MyApp({  Component,  pageProps: { session, ...pageProps },}) {

  
  return (
    <div className={roboto.className}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      <SessionProvider session={session}>
        <AktueltTVLoading/>
        <Component {...pageProps} />
        
      </SessionProvider>
    </div>
  )
}


