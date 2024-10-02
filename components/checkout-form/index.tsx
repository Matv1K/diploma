'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStripe, PaymentElement } from '@stripe/react-stripe-js';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import 'react-phone-input-2/lib/style.css';
import styles from './index.module.scss';

import PhoneInput from 'react-phone-input-2';
import { Button, Modal, Input } from '@/components';

import { resetCart } from '@/features/instruments/instrumentsSlice';

import { getCartItems } from '@/services/cart/cartService';
import { createOrder } from '@/services/orders/ordersService';

import { ButtonTypes, InputTypes } from '@/types';
import { TOAST_MESSAGES } from '@/app/constants';

const CheckoutForm: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const dispatch = useDispatch();
  const stripe = useStripe();
  const { push } = useRouter();

  const { user } = useSelector((state: any) => state.user);

  const { control, handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    defaultValues: {
      phoneNumber: '',
      country: '',
      city: '',
      address: '',
    },
  });

  const watchAllFields = watch();

  useEffect(() => {
    const fetchCartItemsAndSetUserData = async () => {
      let items = [];
      let totalPrice = 0;

      if (user?.user) {
        try {
          const response = await getCartItems();
          items = response.cartItems;
          totalPrice = response.totalPrice;

          setValue('phoneNumber', user.user.phoneNumber || '');
          setValue('country', user.user.address?.country || '');
          setValue('city', user.user.address?.city || '');
          setValue('address', user.user.address?.address || '');
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      } else {
        const sessionCartItems = sessionStorage.getItem('cartItems');

        if (sessionCartItems) {
          items = JSON.parse(sessionCartItems);
          totalPrice = items.reduce((total: number, item: any) => total + item.price * item.amount, 0);
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

    const orderItems = cartItems.map(({ _id, name, color, price, instrumentId, amount }) => ({
      _id,
      name,
      color,
      price,
      instrumentId,
      amount,
    }));

    const formValues = {
      phoneNumber: watchAllFields.phoneNumber,
      country: watchAllFields.country,
      city: watchAllFields.city,
      address: watchAllFields.address,
    };

    try {
      await createOrder({
        items: orderItems,
        totalPrice,
        phoneNumber: formValues.phoneNumber,
        address: {
          country: formValues.country,
          city: formValues.city,
          address: formValues.address,
        },
      });

      sessionStorage.removeItem('cartItems');

      if (user?.user) {
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

          <Button disabled={!stripe || isProcessing || !isValid} className={styles.checkoutButton}
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
