import React from "react";

import styles from "./index.module.scss";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
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
          <p className={styles.contactInfo}>Email: info@musicstore.com</p>
          <p className={styles.contactInfo}>Phone: +123 456 7890</p>
          <p className={styles.contactInfo}>
            Address: 123 Music Avenue, Suite 100
          </p>
        </div>

        <div className={styles.section}>
          <h4 className={styles.heading}>Follow Us</h4>
          <div className={styles.socialLinks}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
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
