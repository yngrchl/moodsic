import spotifyWebApi from "spotify-web-api-node";

/**
 * Given a code returned from Spotify auth,
 * return the Spotify user's access token
 * so we can personalize search results.
 */
const login = async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  }

  const credentials = {
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
  };

  let spotifyApi = new spotifyWebApi(credentials);

  const code = req.body.code;

  // Retrieve an access token
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

export default login;
