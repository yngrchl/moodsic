// import { SpotifyWrapper } from "../contexts/spotifyContext";
import "./styles.modules.scss";

// This default export is required in a new `pages/_app.js` file.
const App = ({ Component, pageProps }) => {
  return (
    // <SpotifyWrapper>
      <Component {...pageProps} />
    // </SpotifyWrapper>
  );
}

export default App;
