import React from "react";

import styles from "./index.module.scss";

import Link from "next/link";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.section}>
          <h4 className={styles.heading}>About Us</h4>

          <p className={styles.description}>
            We are a music store offering the best instruments from renowned
            brands. Our mission is to provide musicians with high-quality
            instruments at competitive prices.
          </p>
        </div>

        <div className={styles.section}>
          <h4 className={styles.heading}>Contact Us</h4>

          <p>Email: info@musicstore.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Music Avenue, Suite 100</p>
        </div>

        <div className={styles.section}>
          <h4 className={styles.heading}>Follow Us</h4>

          <div className={styles.socialLinks}>
            <Link
              className={styles.link}
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </Link>

            <Link
              className={styles.link}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </Link>

            <Link
              className={styles.link}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        &copy; {new Date().getFullYear()} Music Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
