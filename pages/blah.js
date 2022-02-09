import React from "react";
import Footer from "../components/Footer";
import { useSpotifyContext } from "../contexts/spotifyContext";

/**
 * Post login page
 */
const Display = () => {

  const [spotifyUserData, _] = useSpotifyContext();

  return (
    <div className="container">
      <main>user display name: {spotifyUserData?.display_name}</main>

      <Footer />
    </div>
);
};

export default Display;
