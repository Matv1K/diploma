import React from "react";

import styles from "./index.module.scss";

interface FilterCardProps {
  className: string;
}

const FilterCard: React.FC<FilterCardProps> = ({ className }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <ul className={styles.list}>
        <li>laslals</li>
        <li>laslals</li>
        <li>laslals</li>
        <li>laslals</li>
        <li>laslals</li>
        <li>laslals</li>
        <li>laslals</li>
        <li>laslals</li>
        <li>laslals</li>
        <li>laslals</li>
      </ul>
    </div>
  );
};

export default FilterCard;
