'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useStripe, PaymentElement } from '@stripe/react-stripe-js';
import { useForm, Controller } from 'react-hook-form';

import { toast } from 'react-toastify';

import 'react-phone-input-2/lib/style.css';
import styles from './index.module.scss';

import PhoneInput from 'react-phone-input-2';
import { Button, Modal, Input } from '@/components';

import { resetCart } from '@/features/instruments/instrumentsSlice';

import { getCartItems } from '@/api/cart/cartService';
import { createOrder } from '@/api/orders/ordersService';

import { TOAST_MESSAGES } from '@/app/constants';

import { ButtonTypes, InputTypes, CartItemUnionI } from '@/types';
import { RootState } from '@/app/store';

const CheckoutForm: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemUnionI[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { push } = useRouter();
  const stripe = useStripe();

  const { user } = useSelector((state: RootState) => state.user);

  const { control, handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm({ mode: 'onChange',
    defaultValues: {
      phoneNumber: '',
      country: '',
      city: '',
      address: '',
    } });

  const watchAllFields = watch();

  useEffect(() => {
    const fetchCartItemsAndSetUserData = async () => {
      let items = [];
      let totalPrice = 0;

      if (user) {
        try {
          const response = await getCartItems();
          items = response.cartItems;
          totalPrice = response.totalPrice;

          setValue('phoneNumber', user.phoneNumber || '');
          setValue('country', user.address?.country || '');
          setValue('city', user.address?.city || '');
          setValue('address', user.address?.address || '');
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      } else {
        const sessionCartItems = sessionStorage.getItem('cartItems');

        if (sessionCartItems) {
          items = JSON.parse(sessionCartItems);
          totalPrice = items.reduce((total: number, item: CartItemUnionI) => total + item.price * item.amount, 0);
        }

        setValue('phoneNumber', '');
        setValue('country', '');
        setValue('city', '');
        setValue('address', '');
      }

      setCartItems(items);
      setTotalPrice(totalPrice);
    };

    fetchCartItemsAndSetUserData();
  }, [user, setValue]);

  const handleOpenModal = () => {
    setIsModalOpened(true);
  };

  const onConfirmCheckout = async () => {
    setIsProcessing(true);

    const orderItems = cartItems.map(item => {
      if ('_id' in item) {
        const { _id, name, color, price, instrumentId, amount } = item;
        return { _id, name, color, price, instrumentId, amount };
      }

      const { cartItemId, name, color, price, instrumentId, amount } = item;
      return { instrumentId, amount, name, color, price, cartItemId };

    });

    const formValues = {
      phoneNumber: watchAllFields.phoneNumber,
      country: watchAllFields.country,
      city: watchAllFields.city,
      address: watchAllFields.address,
    };

    try {
      await createOrder({ items: orderItems,
        totalPrice,
        phoneNumber: formValues.phoneNumber,
        address: {
          country: formValues.country,
          city: formValues.city,
          address: formValues.address,
        } });

      sessionStorage.removeItem('cartItems');

      if (user) {
        dispatch(resetCart());
      }

      window.dispatchEvent(new Event('cartUpdated'));

      toast.success(TOAST_MESSAGES.CREATE_ORDER);
      push('/');
    } catch (error) {
      console.error('Error processing order:', error);
    } finally {
      setIsProcessing(false);
      setIsModalOpened(false);
    }
  };

  return (
    <form className={styles.checkoutForm} onSubmit={handleOpenModal}>
      <h2 className={styles.headingCheckout}>Checkout</h2>

      <PaymentElement />

      <Button type={ButtonTypes._BUTTON} onClick={() => setIsModalOpened(true)} className={styles.checkoutButton}>
        Pay {totalPrice}$
      </Button>

      {isModalOpened && (
        <Modal heading='Checkout' setIsModalOpened={setIsModalOpened}>
          <p className={styles.modalText}>Please confirm your details before proceeding:</p>

          <div className={styles.inputGroup}>
            <div>
              <Controller
                name='phoneNumber'
                control={control}
                rules={{ required: 'Phone number is required' }}
                render={({ field }) => (
                  <PhoneInput
                    country={'us'}
                    value={field.value}
                    onChange={phone => field.onChange(phone)}
                    inputClass={styles.input}
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: true,
                    }}
                  />
                )}
              />

              {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber.message}</p>}
            </div>

            <div>
              <Controller
                name='country'
                control={control}
                rules={{ required: 'Country is required' }}
                render={({ field }) => (
                  <>
                    <Input
                      type={InputTypes._TEXT}
                      placeholder='Enter your country'
                      className={styles.input}
                      {...field}
                    />

                    {errors.country && <p className={styles.error}>{errors.country.message}</p>}
                  </>
                )}
              />
            </div>

            <div>
              <Controller
                name='city'
                control={control}
                rules={{ required: 'City is required' }}
                render={({ field }) => (
                  <>
                    <Input
                      type={InputTypes._TEXT}
                      placeholder='Enter your city'
                      className={styles.input}
                      {...field}
                    />
                    {errors.city && <p className={styles.error}>{errors.city.message}</p>}
                  </>
                )}
              />
            </div>

            <div>
              <Controller
                name='address'
                control={control}
                rules={{ required: 'Address is required' }}
                render={({ field }) => (
                  <>
                    <Input
                      type={InputTypes._TEXT}
                      placeholder='Enter your address'
                      className={styles.input}
                      {...field}
                    />
                    {errors.address && <p className={styles.error}>{errors.address.message}</p>}
                  </>
                )}
              />
            </div>
          </div>

          <Button
            disabled={!stripe || isProcessing || !isValid}
            className={styles.checkoutButton}
            onClick={handleSubmit(onConfirmCheckout)}
          >
            {isProcessing ? 'Processing...' : `Pay ${totalPrice}$`}
          </Button>
        </Modal>
      )}
    </form>
  );
};

export default CheckoutForm;
