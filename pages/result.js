import React from "react";
import PropTypes from "prop-types";
import Footer from "../components/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { prefixPath } from "../utils/prefix";
import Link from "next/link";

/**
 * Result page - shows user {SPOTIFY_PLAYLIST_LIMIT} number of Spotify playlists
 */
const OPEN_WEATHER_BASE_URL = "http://api.openweathermap.org";
const SPOTIFY_PLAYLIST_LIMIT = 3;

export const getServerSideProps = async () => {
  const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;
  const unsplashPhotosApiKey = process.env.UNSPLASH_PHOTOS_API_KEY;

  return {
    props: {
      openWeatherApiKey,
      unsplashPhotosApiKey,
    },
  };
};

const Result = ({ openWeatherApiKey, unsplashPhotosApiKey }) => {
  const router = useRouter();
  const { zipCode, countryCode } = router.query;

  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [spotifyPlaylistUrls, setSpotifyPlaylistUrls] = useState(null);
  const [backgroundImgData, setBackgroundImgData] = useState(null);
  const [spotifyUserData] = useLocalStorage("spotifyUserData", {});

  const embedSpotifyUrls = (urls) => {
    if (!urls) return [];
    return urls.map((url) => url.replace("/playlist/", "/embed/playlist/"));
  };

  const latLonAddress = `${OPEN_WEATHER_BASE_URL}/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${openWeatherApiKey}`;

  useEffect(() => {
    axios
      .get(latLonAddress)
      .then((response) => {
        // Given zip code and country code, find lat/lon coordinates
        // Given lat/lon coordinates, find weather conditions
        const locationData = `${response.data?.name}, ${response.data?.country}`;
        setLocation(locationData);

        const lat = response.data?.lat;
        const lon = response.data?.lon;
        const weatherAddress = `${OPEN_WEATHER_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`;

        return axios.get(weatherAddress);
      })
      .then((response) => {
        // Given weather description, find background image and spotify playlists that match
        const weatherData = response.data?.weather[0]?.description;
        setWeather(weatherData);

        const backgroundImgAddress = `https://api.unsplash.com/search/photos?query=${weatherData}&per_page=1&orientation=landscape&content_filter=high`;
        const spotifySearchAddress = `https://api.spotify.com/v1/search?q=${weatherData}&type=playlist&market=${countryCode}&limit=${SPOTIFY_PLAYLIST_LIMIT}`;

        const fetchBackgroundImg = axios.get(backgroundImgAddress, {
          headers: {
            Authorization: `Client-ID ${unsplashPhotosApiKey}`,
          },
        });
        const fetchSpotifyPlaylists = axios.get(spotifySearchAddress, {
          headers: {
            Authorization: `Bearer ${spotifyUserData?.accessToken}`,
          },
        });

        return axios.all([fetchBackgroundImg, fetchSpotifyPlaylists]);
      })
      .then(
        axios.spread((...responses) => {
          // Given background image and spotify playlists, render them
          const backgroundImgResponse = responses[0];
          setBackgroundImgData(
            backgroundImgResponse.data?.results[0]?.urls?.full
          );

          const spotifyPlaylistsResponse = responses[1];
          const playlistUrls =
            spotifyPlaylistsResponse.data?.playlists?.items.map(
              (playlist) => playlist?.external_urls?.spotify
            );
          setSpotifyPlaylistUrls(embedSpotifyUrls(playlistUrls));
        })
      )
      .catch((error) => {
        console.log(error);
        //   If failed, show Error page
        window.location = prefixPath("/error");
      });
  }, []);

  const renderSpotifyPlaylistWidgets = () => {
    if (!spotifyPlaylistUrls) {
      return "";
    }

    return spotifyPlaylistUrls.map((url, i) => {
      return (
        <iframe
          src={url}
          width="300"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
          key={i}
        ></iframe>
      );
    });
  };

  return (
    <div
      className="container"
      style={{ backgroundImage: "url(" + backgroundImgData + ")" }}
    >
      <main>
        <div className="text-container">
          <h1>
            Looks like <div className="highlight">{location}</div> is
            experiencing <div className="highlight">{weather}</div> right now.
          </h1>
          <p>
            Here are {spotifyPlaylistUrls?.length} Spotify playlists that can be
            the perfect soundtrack to your life in this moment.
          </p>

          <p className="psst">
            Want to switch things up? Click{"  "}
            <Link href={prefixPath("/dashboard")}>
              <a>
                <b>here</b>
              </a>
            </Link>{" "}
            to try again with a new location.
          </p>
        </div>
        <div className="playlist-container">
          {renderSpotifyPlaylistWidgets()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Result;

Result.propTypes = {
  openWeatherApiKey: PropTypes.string.isRequired,
  unsplashPhotosApiKey: PropTypes.string.isRequired,
};
