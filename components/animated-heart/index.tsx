'use client';

import React, { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import styles from './index.module.scss';

const Heart: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [sparkles, setSparkles] = useState<number[]>([]);

  const handleClick = () => {
    setIsLiked(!isLiked);

    setSparkles(prev => [...prev, Math.random()]);

    setTimeout(() => {
      setSparkles([]);
    }, 1000);
  };

  return (
    <div className={styles.heartContainer} onClick={handleClick}>
      <FiHeart className={`${styles.heartIcon} ${isLiked ? styles.liked : ''}`} />
      {sparkles.map((_, index) => (
        <div
          key={index}
          className={styles.sparkle}
          style={{
            left: `${Math.random() * 100}%`,
            top: '100%', // Random vertical position
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`, // Random color
            width: `${Math.random() * 8 + 8}px`, // Random size between 8px and 16px
            height: `${Math.random() * 8 + 8}px`, // Random size between 8px and 16px
          }}
        />
      ))}
    </div>
  );
};

export default Heart;
