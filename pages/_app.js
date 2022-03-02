import React from 'react';
import './styles.modules.scss';

// This default export is required in a new `pages/_app.js` file.
// eslint-disable-next-line react/prop-types
const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
