'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';

import styles from './page.module.scss';

import { toast } from 'react-toastify';

import Link from 'next/link';
import Image from 'next/image';
import { Button, Comment, Loader } from '@/components';

import { FiHeart } from 'react-icons/fi';

import { removeSeparator } from '@/utils';

import { addItemToCart, addLikedItemToState, removeLikedItemFromState } from '@/features/instruments/instrumentsSlice';
import { addComment, setComments } from '@/features/comments/commentsSlice';

import { getInstrument } from '@/services/instruments/instrumentService';
import { addCartItem } from '@/services/cart/cartService';
import { addLikedItem, getLikedItem, deleteLikedItem } from '@/services/liked/likedService';
import { createComment, getComments } from '@/services/comments/commentsService';

import { ButtonTypes, CommentI, InstrumentI } from '@/types';
import { RootState } from '@/app/store';

const Instrument: React.FC = () => {
  const [instrument, setInstrument] = useState<InstrumentI>({
    name: '',
    isNew: false,
    brandName: '',
    bought: 0,
    section: '',
    salePrice: 0,
    _id: '',
    description: '',
    characteristics: {},
    instrumentType: '',
    price: 0,
    image: '',
    colors: [],
  });
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  const { instrument: instrumentId } = useParams();

  const comments = useSelector((state: RootState) => state.comments.comments);

  useEffect(() => {
    const fetchInstrument = async () => {
      const instrument = await getInstrument(instrumentId);
      setInstrument(instrument);

      const likedItem = await getLikedItem(instrumentId);
      setIsLiked(!!likedItem);
      setIsLoading(false);
    };

    const fetchComments = async () => {
      const fetchedComments = await getComments(instrumentId);
      dispatch(setComments(fetchedComments));
    };

    fetchInstrument();
    fetchComments();
  }, [instrumentId, dispatch]);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      const newItem = await addCartItem({
        price: instrument?.price,
        name: instrument?.name,
        image: instrument?.image,
        color: selectedColor,
        brandName: instrument?.brandName,
        instrumentId: instrument?._id,
        section: instrument?.section,
        instrumentType: instrument?.instrumentType,
        amount: 1,
      });

      dispatch(addItemToCart(newItem));
      toast.success(`${instrument.name} has been added to the cart!`);
    } catch (error: any) {
      if (error.message) {
        toast.error(error.message);
      }
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  const handleLikeItem = async () => {
    try {
      if (isLiked) {
        await deleteLikedItem(instrumentId);
        dispatch(removeLikedItemFromState(instrumentId));

        setIsLiked(false);
        toast.success(`${instrument.name} has been unliked.`);
      } else {
        const likedData = {
          price: instrument?.price,
          name: instrument?.name,
          image: instrument?.image,
          colors: instrument?.colors,
          brandName: instrument?.brandName,
          instrumentId: instrument?._id,
          section: instrument?.section,
          instrumentType: instrument?.instrumentType,
        };

        await addLikedItem(likedData);
        dispatch(addLikedItemToState(likedData));

        setIsLiked(true);
        toast.success(`${instrument.name} has been liked!`);
      }
    } catch (error) {
      toast.error(`Failed to update like status for ${instrument.name}: ${error}`);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText || rating === 0) {
      alert('Please provide a comment and a rating.');
      return;
    }

    try {
      const newComment = await createComment({
        rating,
        description: commentText,
        instrumentId,
      });

      dispatch(addComment(newComment));

      setCommentText('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (isLoading) {
    return (
      <main>
        <Loader />
      </main>
    );
  }

  return (
    <main>
      <h2>{removeSeparator(instrument?.name)}</h2>

      <div className={styles.instrumentPageContainer}>
        <div className={styles.instrumentImageContainer}>
          <Image
            alt={instrument?.name}
            className={styles.instrumentImage}
            src={instrument?.image}
            width={300}
            height={400}
          />
        </div>

        <div className={styles.instrumentData}>
          <div className={styles.instrumentInfo}>
            <div className={styles.instrumentMainInfo}>
              <Link className={styles.infoReview} href='#'>
                Write a review
              </Link>

              <p className={styles.infoName}>
                {instrument?.name} /{' '}
                <span className={styles.infoBrandName}>
                  {instrument?.brandName}
                </span>
              </p>

              <h3 className={styles.infoPrice}>
                {instrument?.onSale && (
                  <>
                    <span className={styles.priceOriginal}>{instrument.price}$</span>
                    <span>{instrument.salePrice}$</span>
                  </>
                )}

                {!instrument?.onSale && (
                  <span>{instrument.price}$</span>
                )}
              </h3>

              <p className={styles.infoAvailable}>The instrument is available at our store</p>
            </div>

            <div className={styles.radioButtons}>
              {instrument?.colors?.map((color: string, index: number) => (
                <label key={index} className={styles.label}>
                  <input
                    name='color'
                    className={`${styles.radio} ${selectedColor === color ? styles.selected : ''}`}
                    type='radio'
                    value={color}
                    onChange={handleRadioChange}
                    style={{ color }}
                  />
                </label>
              ))}
            </div>

            <Button onClick={handleAddToCart}>Add to cart</Button>
          </div>

          <div>
            <h4>Description: </h4>
            <p className={styles.instrumentDescription}>{instrument?.description}</p>

            {instrument.characteristics && (
              <div>
                <h4>Characteristics: </h4>
                <ul className={styles.instrumentSpecs}>
                  {Object.entries(instrument.characteristics || {}).map(([key, value]: [string, string]) => (
                    <li className={styles.instrumentSpec} key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <FiHeart
            size={24}
            onClick={handleLikeItem}
            className={`${styles.likeIcon} ${isLiked ? styles.likeIconFilled : ''}`}
          />
        </div>
      </div>

      <section className={styles.commentsSection}>
        <h2>Comments</h2>

        <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
          <textarea
            placeholder='Write a comment...'
            className={styles.commentInput}
            value={commentText}
            onChange={handleCommentChange}
          />

          <div className={styles.ratingInput}>
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                className={`${styles.star} ${rating >= star ? styles.filled : ''}`}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>

          <div>
            <Button type={ButtonTypes._SUBMIT}>Submit</Button>
          </div>
        </form>

        <div className={styles.commentsList}>
          {comments.map(
            ({ _id, createdAt, description, userName, rating }: CommentI) => (
              <Comment
                key={_id}
                description={description}
                userName={userName}
                rating={rating}
                createdAt={createdAt}
              />
            ),
          )}
        </div>
      </section>
    </main>
  );
};

export default Instrument;
