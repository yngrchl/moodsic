import { createContext, useContext, useState, useMemo } from "react";

const SpotifyContext = createContext();

export function SpotifyWrapper({ children }) {
  const [spotifyUserData, setSpotifyUserData] = useState({});

  const value = useMemo(() => ([ spotifyUserData, setSpotifyUserData ]), [spotifyUserData]);

  return (
    <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
  );
}

export function useSpotifyContext() {
  return useContext(SpotifyContext);
}
