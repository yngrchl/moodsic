import Head from 'next/head'
import LoginButton from '../components/LoginButton'
import { prefix } from '../utils/prefix';

/**
 * Home/login page
 */

const Home = () => {
  const githubImgSrc = () => {
    if (prefix === "") {
      return "Github-Mark-32px.png";
    }
    return `${prefix}/public/Github-Mark-32px.png`;
  };

  return (
    <div className="container">
      <Head>
        <title>moodsic</title>
        <link rel="icon" href="favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon-16x16.png"
        />
        <link rel="manifest" href="site.webmanifest" />
        <link rel="mask-icon" href="safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <main>
        <h1 className="title">
          <img
            src="moodsic-icon.svg"
            alt="moodsic icon of cloud and sun with sound waves"
          />
          moodsic
        </h1>
        <LoginButton />
      </main>

      <footer>
        <p>source code at</p>{" "}
        <a href="https://github.com/yngrchl/moodsic">
          <img
            src={githubImgSrc()}
            alt="Github logo"
          />
        </a>
      </footer>
    </div>
  );
}

export default Home;
