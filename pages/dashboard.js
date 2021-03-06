import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { useRouter } from 'next/router';
import axios from 'axios';
import Footer from '../components/Footer';
import { prefixPath } from '../utils/prefix';
import { useLocalStorage } from 'react-use';
import Button from '../components/Button';
import cx from 'classnames';

/**
 * Post login page
 */
const Dashboard = () => {
  const [code, setCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [spotifyUserData, setSpotifyUserData] = useLocalStorage(
    'spotifyUserData',
    {}
  );
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!code) return;

    axios
      .post(prefixPath('/api/login'), { code })
      .then((response) => {
        // If successful, remove code string from URL
        // and return accessToken
        window.history.pushState({}, null, prefixPath('/dashboard'));

        setAccessToken(response.data.accessToken);
      })
      .catch(() => {
        //   If failed, clear local storage and show Error page
        localStorage.clear();
        window.location = prefixPath('/error');
      });
  }, [code]);

  const { query } = useRouter();

  useEffect(() => {
    const newCode = query?.code;

    if (newCode && newCode !== code) {
      setCode(newCode);
    }
  }, [query, code]);

  useEffect(() => {
    if (!accessToken) return;

    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    });

    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getMe().then((data) => {
      const spotifyData = data?.body;
      spotifyData.accessToken = accessToken;

      setSpotifyUserData(spotifyData);
    });
  }, [accessToken, setSpotifyUserData]);

  useEffect(() => {
    if (spotifyUserData?.display_name) {
      setUsername(` ${spotifyUserData?.display_name}`);
    }
  }, [spotifyUserData?.display_name]);

  const submit = async (e) => {
    e.preventDefault();
    router.push({
      pathname: prefixPath('/result'),
      query: {
        zipCode: e.target?.zipCode?.value,
        countryCode: e.target?.countryCode?.value,
      },
    });
  };

  const firstVisit = !query.revisit;

  return (
    <div className="container">
      <main className={cx('', { first: firstVisit })}>
        <div className="buffer">
          <li>
            <h1>Hi{username}!</h1>
          </li>

          <li>
            <h2>Let&apos;s set the ~mood~ for today.</h2>
          </li>
          <li>
            <p>
              Using just a zip code and a 2-letter country code, we&apos;ll find
              a few Spotify playlists for you that match today&apos;s weather
              forecast.
            </p>
          </li>

          <li>
            <form className="zipcode-form" onSubmit={submit}>
              <label htmlFor="zipCode">zip code:</label>
              <input id="zipCode" placeholder="ie: 90909" required />
              <label htmlFor="countryCode">2-letter country code:</label>
              <input
                id="countryCode"
                placeholder="ie: US"
                maxLength="2"
                className="country"
                required
              />
              <Button text="Find me some tunes" type="submit" />
            </form>
          </li>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
