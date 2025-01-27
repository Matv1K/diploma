'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';

import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

import styles from './page.module.scss';

import Link from 'next/link';
import Image from 'next/image';
import { Button, Comment, Loader } from '@/components';

import { FiHeart } from 'react-icons/fi';

import { removeSeparator } from '@/utils';

import { addItemToCart, addLikedItemToState, removeLikedItemFromState } from '@/features/instruments/instrumentsSlice';
import { addComment, setComments } from '@/features/comments/commentsSlice';

import { getInstrument } from '@/api/instruments/instrumentService';
import { addCartItem } from '@/api/cart/cartService';
import { addLikedItem, getLikedItem, deleteLikedItem } from '@/api/liked/likedService';
import { createComment, getComments } from '@/api/comments/commentsService';
import { verifyOrderedItem } from '@/api/orders/ordersService';

import { TOAST_MESSAGES } from '@/app/constants';

import { ApiError, ButtonTypes, CartItemWithLocalIdI, CommentI, InstrumentI } from '@/types';
import { RootState } from '@/app/store';

const Instrument: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  const commentsRef = useRef<HTMLDivElement | null>(null);

  const { user } = useSelector((state: RootState) => state.user);
  const comments = useSelector((state: RootState) => state.comments.comments);

  const { instrument: instrumentId } = useParams();
  const { push } = useRouter();
  const dispatch = useDispatch();

  const convertedInstrumentId = Array.isArray(instrumentId) ? instrumentId[0] : instrumentId;

  const isAuthorized = !!user;

  useEffect(() => {
    const fetchInstrument = async () => {
      const instrument = await getInstrument(convertedInstrumentId);
      setInstrument(instrument);

      if (isAuthorized) {
        const likedItem = await getLikedItem(convertedInstrumentId);
        setIsLiked(!!likedItem);
      }

      setIsLoading(false);
    };

    const fetchComments = async () => {
      const fetchedComments = await getComments(convertedInstrumentId);
      dispatch(setComments(fetchedComments));
    };

    fetchInstrument();
    fetchComments();
  }, [instrumentId, dispatch]);

  const handleScrollToComments = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    commentsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const cartItemId = uuidv4();

    const newItem = {
      cartItemId,
      name: instrument.name,
      image: instrument.image,
      color: selectedColor,
      brandName: instrument.brandName,
      instrumentId: instrument._id,
      section: instrument.section,
      amount: 1,
      instrumentType: instrument.instrumentType,
      price: instrument.price,
    };

    try {
      if (user) {
        const addedItem = await addCartItem(newItem);

        dispatch(addItemToCart(addedItem));
        toast.success(TOAST_MESSAGES.ADD_TO_CART_SUCCESS);
      } else {
        const cartItems = JSON.parse(sessionStorage.getItem('cartItems') || '[]');

        if (!newItem.color) {
          toast.error('You have to choose a color');
          return;
        }

        if(cartItems.some((cartItem: CartItemWithLocalIdI) =>
          cartItem.instrumentId === newItem.instrumentId && cartItem.color === newItem.color) === true) {
          toast.error('Item is already in the cart');
          return;
        }

        cartItems.push(newItem);

        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));

        window.dispatchEvent(new Event('cartUpdated'));

        toast.success(TOAST_MESSAGES.ADD_TO_CART_SUCCESS);
      }
    } catch(error) {
      const apiError = error as ApiError;

      toast.error(apiError.response.data.message);
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  const handleLikeItem = async () => {
    if (isAuthorized) {
      try {
        if (isLiked) {
          await deleteLikedItem(convertedInstrumentId);
          dispatch(removeLikedItemFromState(instrumentId));

          setIsLiked(false);
          toast.success(TOAST_MESSAGES.UNLIKE_ITEM_SUCCESS);
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
          toast.success(TOAST_MESSAGES.LIKE_ITEM_SUCCES);
        }
      } catch (error) {
        toast.error(`Failed to update like status for ${instrument.name}: ${error}`);
      }
    } else {
      push('/sign-in');
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

    if (isAuthorized) {
      if (!commentText || rating === 0) {
        toast.error('Please provide a comment and a rating.');
        return;
      }

      const convertedInstrumentId = Array.isArray(instrumentId) ? instrumentId[0] : instrumentId;

      const hasInstrument = await verifyOrderedItem(convertedInstrumentId);

      if (!hasInstrument) {
        toast.error("You haven't bought this item yet");
        return;
      }

      try {
        const newComment = await createComment({
          rating,
          description: commentText,
          instrumentId: convertedInstrumentId,
        });

        dispatch(addComment(newComment));

        setCommentText('');
        setRating(0);
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    } else {
      push('/sign-in');
    }
  };

  if (isLoading) {
    return (
      <main className={styles.containerEmpty}>
        <Loader />
      </main>
    );
  }

  return (
    <main>
      <h2 className={styles.heading}>{removeSeparator(instrument?.name)}</h2>

      <div className={styles.instrumentPageContainer}>
        <div className={styles.instrumentImageContainer}>
          <Image
            alt={instrument?.name}
            className={styles.instrumentImage}
            src={instrument?.image}
            width={300}
            height={300}
          />
        </div>

        <div className={styles.instrumentData}>
          <div className={styles.instrumentInfo}>
            <div className={styles.instrumentMainInfo}>
              <Link
                className={styles.infoReview}
                href='#'
                onClick={handleScrollToComments}
              >
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
                    <span className={styles.priceOriginal}>{instrument?.price}$</span>
                    <span>{instrument?.salePrice}$</span>
                  </>
                )}

                {!instrument?.onSale && (
                  <span>{instrument?.price}$</span>
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

            {instrument?.characteristics && (
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

      <section ref={commentsRef} className={styles.commentsSection}>
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
