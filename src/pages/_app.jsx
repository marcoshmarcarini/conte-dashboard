import '@/styles/globals.css'
import '../utils/firebase'
import {SessionProvider} from "next-auth/react"
import Head from 'next/head'
import React from 'react'

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Contê Dashboard</title>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
