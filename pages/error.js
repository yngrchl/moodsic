import Button from '../components/Button/Button';
import Footer from '../components/Footer';
import { prefixPath } from '../utils/prefix';
import Image from 'next/image';

/**
 * Error page
 */
const Error = () => (
  <div className="container">
    <main>
      <h1 className="title">
        <div className="image">
          <Image
            className="image"
            src="/error-moodsic-icon.svg"
            alt="error icon of thunderstorm cloud"
            width="150px"
            height="150px"
          />
        </div>
        oops, something went wrong.
      </h1>
      <div style={{ marginTop: '5rem' }}>
        <Button
          href={prefixPath('/')}
          text="TRY AGAIN FROM THE BEGINNING"
          type="error"
        />
      </div>
    </main>

    <Footer />
  </div>
);

export default Error;
