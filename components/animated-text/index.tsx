"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./index.module.scss";

const texts = ["Welcome", "To My Site", "Enjoy Your Stay"];

const AnimatedText: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.textWrapper}>
      <h1 className={styles.animatedText}>
        <AnimatePresence>
          <motion.span
            key={texts[index]}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className={styles.text}
          >
            {texts[index]}
          </motion.span>
        </AnimatePresence>
      </h1>
    </div>
  );
};

export default AnimatedText;
