import Footer from "../components/Footer";
import useSWR from 'swr';
import axios from 'axios';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { useLocalStorage } from "react-use";
import { render } from "react-dom";

/**
 *
 */
export const getServerSideProps = async ({ query }) => {
  // const zipCode = query?.zipCode;
  // const countryCode = query?.countryCode;

  // const latLonAddress = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${process.env.OPEN_WEATHER_API_KEY}`;
  // const weatherAddress = ``

  const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;

  return {
    props: {
      openWeatherApiKey,
    },
  };
};

const OPEN_WEATHER_BASE_URL = "http://api.openweathermap.org"

const Result = ({ openWeatherApiKey }) => {
  const router = useRouter();
  const { zipCode, countryCode } = router.query;
  // const zipCode = router.query?.zipCode;
  // const countryCode = router.query?.countryCode;

  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [spotifyPlaylistUrls, setSpotifyPlaylistUrls] = useState(null);
  const [error, setError] = useState(null);
  const [spotifyUserData, _] = useLocalStorage("spotifyUserData", {});

  if (!(openWeatherApiKey && zipCode && countryCode)) {
    return <div>failed to load</div>;
  }

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

        const spotifySearchAddress = `https://api.spotify.com/v1/search?q=${weatherData}&type=playlist&market=${countryCode}&limit=5`;

        return axios.get(spotifySearchAddress, {
                headers: {
                  'Authorization': `Bearer ${spotifyUserData?.accessToken}`
                }})
      })
      .then((response) => {
        const playlistUrls = response.data.playlists.items.map((playlist) =>
          playlist.external_urls.spotify
        )

        console.log(playlistUrls)

        console.log(embedSpotifyUrls(playlistUrls))

        setSpotifyPlaylistUrls(embedSpotifyUrls(playlistUrls))
      })
      .catch((error) => console.log(error.response));
  }, [])

  // const fetcher = (url) => axios.get(url).then((res) => res.data);
  // const { data, error } = useSWR(address, fetcher);


  if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;
  // return <div>hello {data}!</div>;

  const renderSpotifyPlaylistWidgets = (urls) => {
    if (!urls) {return}
    return urls.map((url) => {
      return <iframe
        src={url}
        width="300"
        height="380"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    });
  }


  return (
    <div className="container">
      <main>
        <h1 className="title">
          <img
            src="moodsic-icon.svg"
            alt="moodsic icon of cloud and sun with sound waves"
          />
          {location}
          <br />
          {weather}
          <br />
          {renderSpotifyPlaylistWidgets(spotifyPlaylistUrls)}
        </h1>
      </main>

      <Footer />
    </div>
  );
};;

export default Result;
