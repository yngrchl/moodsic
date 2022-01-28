import React from 'react';
import { loginUrl } from '../../utils/spotify';
import styles from './LoginButton.module.scss';

/**
 * Button to log into Spotify account
 */
const Login = () => {
  return (
    <a href={loginUrl} className={styles.login}>
      <h4>LOG IN WITH SPOTIFY</h4>
    </a>
  )
}

export default Login;
