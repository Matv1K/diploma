import React from 'react';
import dayjs from 'dayjs';

import styles from './index.module.scss';

import { getRatingString } from '@/utils';

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
  const formattedDate = dayjs(createdAt).format('MMMM D, YYYY');

  return (
    <div className={styles.comment}>
      <span>
        <span>{userName}</span>
        {formattedDate}
      </span>

      <p className={styles.description}>{description}</p>

      <div className={styles.commentRating}>{getRatingString(rating)}</div>
    </div>
  );
};

export default Comment;
