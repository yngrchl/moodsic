import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import styles from './Button.module.scss';

/**
 * Generic button
 * @param {string} href (optional) | redirect URL on button click
 * @param {string} text (optional) | text displayed within button
 * @param {string} type | determined styling of button. can be either "login" (green Spotify) or "error" (red error)
 */
const Button = ({ href, text, type }) => {
  const cx = classNames.bind(styles);

  return(
  <a href={href} className={cx('btn', type)}>
    <h4>{text}</h4>
  </a>
)};

Button.defaultProps = {
  href: '#',
  text: ''
};

Button.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.oneOf(["login", "error"]).isRequired,
};

export default Button;
