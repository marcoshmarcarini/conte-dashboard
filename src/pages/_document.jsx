import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const dashboard = 'Contê Dashboard'

  return (
    <Html lang="pt-BR">
      <Head>
        <title>{dashboard}</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  ) 
}
