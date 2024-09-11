import React from "react";

import styles from "./index.module.scss";

import { Carousel } from "../../components";

const COMMENTS = [
  { name: "commment 1", id: 1, text: "lorem asdfa werw ewr" },
  { name: "comment 2", id: 2, text: "lorem asdfa werw ewr" },
  { name: "comment 3", id: 3, text: "lorem asdfa werw ewr" },
  { name: "comment 4", id: 4, text: "lorem asdfa werw ewr" },
  { name: "comment 5", id: 5, text: "lorem asdfa werw ewr" },
  { name: "comment 6", id: 6, text: "lorem asdfa werw ewr" },
];

const Comments = () => {
  return (
    <div className={styles.comments}>
      <h2>Comments</h2>

      <Carousel items={COMMENTS} />
    </div>
  );
};

export default Comments;
