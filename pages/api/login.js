import spotifyWebApi from "spotify-web-api-node";

/**
 * Given a code returned from Spotify auth,
 * return the Spotify user's access token
 * so we can personalize search results.
 */
const login = async (req, res) => {
  const credentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
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

/**
 * Saving below code for possible reuse later
 * ---------------
 */

// const [urlParams, setUrlParams] = useSearchParams();
// const code = urlParams.get("code");

// const body = {
//   grant_type: 'authorization_code',
//   code: code,
//   redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
//   client_id: process.env.SPOTIFY_CLIENT_ID,
//   client_secret: process.env.SPOTIFY_CLIENT_SECRET
// }

// const auth_response = post to 'https://accounts.spotify.com/api/token', with body
// const auth_params = JSON.parse(auth_response.body)

// header = {
//   Authorization: `Bearer ${auth_params["access_token"]}`
// }

// user_response = get 'https://api.spotify.com/v1/me', header

// user_params = JSON.parse(user_response.body)

