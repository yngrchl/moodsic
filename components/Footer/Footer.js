import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Footer at bottom of each page
 */
const Footer = () => (
  <footer>
    <p>source code at</p>{' '}
    <Link href="https://github.com/yngrchl/moodsic">
      <a>
        <Image
          src="/github-icon.png"
          alt="Github logo"
          width="20px"
          height="20px"
        />
      </a>
    </Link>
  </footer>
);

export default Footer;
