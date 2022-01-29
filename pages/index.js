import Head from 'next/head'
import Footer from '../components/Footer'
import { loginUrl } from "../utils/spotify";
import Button from '../components/Button/Button';

/**
 * Home/login page
 */
const Home = () => {
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
        <Button href={loginUrl} text="LOG IN WITH SPOTIFY" type="login" />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
