/**
 * Build Spotify login URL
 */
const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
const clientId = process.env.SPOTIFY_CLIENT_ID;

const scopes = [
  "playlist-modify-private",
  "playlist-read-collaborative",
  "playlist-read-private",
  "user-top-read",
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&show_dialog=true&scope=${scopes.join(
  "%20"
)}`;



/**
 * Saving below code for possible reuse later
 * ---------------
 */

// import querystring from "querystring";

// const client_id = process.env.SPOTIFY_CLIENT_ID;
// const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

// const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
// const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// const getAccessToken = async () => {
//   const response = await fetch(TOKEN_ENDPOINT, {
//     method: "POST",
//     headers: {
//       Authorization: `Basic ${basic}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: querystring.stringify({
//       grant_type: "refresh_token",
//       refresh_token,
//     }),
//   });

//   return response.json();
// };

// const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;

// export const getTopTracks = async () => {
//   const { access_token } = await getAccessToken();

//   console.log('hi ',access_token)

//   return fetch(TOP_TRACKS_ENDPOINT, {
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//     },
//   });
// };
