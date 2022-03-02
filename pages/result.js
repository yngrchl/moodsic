import Footer from "../components/Footer";
import useSWR from 'swr';
import axios from 'axios';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { useLocalStorage } from "react-use";
import { prefixPath } from "../utils/prefix";

/**
 * Result page - shows user 6 Spotify playlists
 */
const OPEN_WEATHER_BASE_URL = "http://api.openweathermap.org";

export const getServerSideProps = async () => {
  const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;
  const unsplashPhotosApiKey = process.env.UNSPLASH_PHOTOS_API_KEY;

  return {
    props: {
      openWeatherApiKey,
      unsplashPhotosApiKey
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
  const [spotifyUserData, _] = useLocalStorage("spotifyUserData", {});

  const embedSpotifyUrls = urls => {
    return urls.map((url) =>
      url.replace('/playlist/', '/embed/playlist/')
    )
  }

  const latLonAddress = `${OPEN_WEATHER_BASE_URL}/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${openWeatherApiKey}`;

  useEffect(() => {
    axios
      .get(latLonAddress)
      .then((response) => {
        const locationData = `${response.data?.name}, ${response.data?.country}`;
        setLocation(locationData);

        const lat = response.data?.lat;
        const lon = response.data?.lon;
        const weatherAddress = `${OPEN_WEATHER_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`;

        return axios.get(weatherAddress);
      })
      .then((response) => {
        const weatherData = response.data?.weather[0]?.description;
        setWeather(weatherData);

        const photoBackgroundAddress = `https://api.unsplash.com/search/photos?query=${weatherData}&per_page=1&orientation=landscape&content_filter=high`

        return axios.get(photoBackgroundAddress, {
          headers: {
            Authorization: `Client-ID ${unsplashPhotosApiKey}`,
          },
        })
      })
      .then((response) => {
        setBackgroundImgData(response.data?.results[0]?.urls?.full)
        const spotifySearchAddress = `https://api.spotify.com/v1/search?q=${weather}&type=playlist&market=${countryCode}&limit=6`;

        return axios.get(spotifySearchAddress, {
                headers: {
                  'Authorization': `Bearer ${spotifyUserData?.accessToken}`
                }})
      })
      .then((response) => {
        const playlistUrls = response.data.playlists.items.map((playlist) =>
          playlist.external_urls.spotify
        )

        setSpotifyPlaylistUrls(embedSpotifyUrls(playlistUrls))
      })
      .catch((error) => {
        console.log(error)
        //   If failed, show Error page
        window.location = prefixPath("/error");
      });
  }, [])

  const renderSpotifyPlaylistWidgets = () => {
    if (!spotifyPlaylistUrls) {return ''}

    return spotifyPlaylistUrls.map((url, i) => {
      return <iframe
        src={url}
        width="300"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        key={i}
      ></iframe>
    });
  }

  return (
    <div
      className="container"
      style={{ backgroundImage: "url(" + backgroundImgData + ")" }}
    >
      <main>
        <div style={{ backgroundColor: 'white' }}>
          <h1>
            Looks like {location} is experiencing {weather} right now.
          </h1>
          <p>
            Here are 5 Spotify playlists that will set the perfect soundtrack to
            your life in this moment.
          </p>
        </div>
        <div className="playlist-container">
          {renderSpotifyPlaylistWidgets()}
        </div>
      </main>

      <Footer />
    </div>
  );
};;

export default Result;
