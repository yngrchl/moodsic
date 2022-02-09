import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useRouter } from "next/router";
import axios from "axios";
import Footer from '../components/Footer';
import Link from 'next/link';
import { prefixPath } from '../utils/prefix';
import { useSpotifyContext } from "../contexts/spotifyContext";

/**
 * Post login page
 */
const Dashboard = () => {
  const [code, setCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [_, setSpotifyUserData] = useSpotifyContext();

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
      <main>
        <Link href="/blah">
          <a>About You</a>
        </Link>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;