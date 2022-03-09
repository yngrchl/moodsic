/**
 * Build Spotify login URL
 */
const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;

const scopes = [
  'user-read-private',
  'user-read-email'
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&show_dialog=true&scope=${scopes.join(
  '%20'
)}`;
