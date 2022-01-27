function GlobalStyle() {
  return (
    <style global jsx>{`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 
    `}</style>
  )
}

function Video() {
  return (
    <>
      <video autoPlay loop muted>
        <source src={'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/292030/1fd28b25668126b0a14d3955906945b941571e44.webm'}/>
      </video>

      <style jsx>{`
        video {
          object-fit: cover;
          width: 100%;
          height: 100%;
          position: fixed;
          z-index: -1;
        }
      `}</style>
    </>
  )
};

export default function MyApp({ Component, pageProps }) {
  return (
    <>
    <GlobalStyle />
    <Video />
    <Component {...pageProps} />
    </>
  )
};