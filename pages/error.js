import Button from '../components/Button/Button';
import Footer from '../components/Footer';
import { prefixPath } from '../utils/prefix';

/**
 * Error page
 */
const Error = () => (
  <div className="container">
    <main>
      <h1 className="title">
        <img
          src="error-moodsic-icon.svg"
          alt="error icon of thunderstorm cloud"
        />
        oops, something went wrong.
      </h1>
      <Button href={prefixPath("/")} text="TRY AGAIN FROM THE BEGINNING" type="error" />
    </main>

    <Footer />
  </div>
);

export default Error;