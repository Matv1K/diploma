'use client';

import React, { useState } from 'react';

import styles from './index.module.scss';

import { FiHeart } from 'react-icons/fi';

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
            top: '100%',
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
            width: `${Math.random() * 8 + 8}px`,
            height: `${Math.random() * 8 + 8}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Heart;
