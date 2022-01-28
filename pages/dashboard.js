import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useRouter } from "next/router";
import axios from "axios";


/**
 * Post login page
 */
const Dashboard = () => {
  const [code, setCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userProfileData, setUserProfileData] = useState();

  useEffect(() => {
    if (!code) return;

    axios
      .post("/api/login", { code })
      .then((response) => {
        // If successful, remove code string from URL
        // and return accessToken
        window.history.pushState({}, null, "/dashboard");

        setAccessToken(response.data.accessToken);
      })
      .catch(() => {
        //   If failed, redirect to Home/Login page
        window.location = "/";
      });
  }, [code]);

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
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
      setUserProfileData(data?.body);
    })
  }, [accessToken]);

  return (
    <div>
      user display name: {userProfileData?.display_name}
    </div>
  );
}

export default Dashboard;