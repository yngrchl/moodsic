import React from 'react';
import Link from 'next/link';

/**
 * Footer at bottom of each page
 */
const Footer = () => (
  <footer>
    <p>source code at</p>{" "}
    <Link href="https://github.com/yngrchl/moodsic">
      <a>
        <img src="github-icon.png" alt="Github logo" />
      </a>
    </Link>
  </footer>
);

export default Footer;
