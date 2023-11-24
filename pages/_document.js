import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <head>
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}/>
      </head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
