import React from "react";

import styles from "./index.module.scss";

interface CommentProps {
  userName: string;
  createdAt: string;
  description: string;
  rating: number;
}

const Comment: React.FC<CommentProps> = ({
  userName,
  createdAt,
  description,
  rating,
}) => {
  return (
    <div className={styles.comment}>
      <span>
        <span className={styles.username}>{userName}</span>
        {createdAt}
      </span>
      <p>{description}</p>

      <div className={styles.commentRating}>★★★★☆</div>
    </div>
  );
};

export default Comment;
