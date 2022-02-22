import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useRouter } from "next/router";
import axios from "axios";
import Footer from '../components/Footer';
import { prefixPath } from '../utils/prefix';
import { useLocalStorage } from "react-use";
import Button from "../components/Button";

/**
 * Post login page
 */
const Dashboard = () => {
  const [code, setCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [spotifyUserData, setSpotifyUserData] = useLocalStorage("spotifyUserData", {});
  const name = spotifyUserData?.display_name
      ? ` ${spotifyUserData?.display_name}`
      : "";


  useEffect(() => {
    if (!code) return;

    axios
      .post(prefixPath("/api/login"), { code })
      .then((response) => {
        // If successful, remove code string from URL
        // and return accessToken
        window.history.pushState({}, null, prefixPath("/dashboard"));

        setAccessToken(response.data.accessToken);
      })
      .catch(() => {
        //   If failed, show Error page
        window.location = prefixPath("/error");
      });
  }, [code]);

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  });

  const { query } = useRouter();

  useEffect(() => {
    const newCode = query?.code;

    if (newCode && newCode !== code) {
      setCode(newCode);
    }
  }, [query, code]);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getMe().then(data => {
      setSpotifyUserData(data?.body);
    })
  }, [accessToken]);

  return (
    <div className="container">
      <main className="dashboard">
        <li>
          <h1>Hi{name}!</h1>
        </li>

        <li>
          <h2>Let's set the ~mood~ for today.</h2>
        </li>
        <li>
          <p>
            Using just a zip code, we'll find a Spotify playlist for you that
            matches today's weather forecast.
          </p>
        </li>

        <li>
          <form className="zipcode-form">
            <input
              inputmode="numeric"
              placeholder="enter zip code here"
              required
            />
            <Button text="Find me some tunes" type="submit" />
          </form>
        </li>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;