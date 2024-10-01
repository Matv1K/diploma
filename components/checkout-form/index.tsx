'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStripe, PaymentElement } from '@stripe/react-stripe-js';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux'; // Import useSelector to get user data from Redux

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import styles from './index.module.scss';

import { Button, Modal, Input } from '@/components'; // Assuming custom Input component is imported from here

import { getCartItems } from '@/services/cart/cartService';
import { createOrder } from '@/services/orders/ordersService';

import { ButtonTypes } from '@/types';

const CheckoutForm: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]); // Ensure proper typing
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const stripe = useStripe();
  const { push } = useRouter();

  // Get current user details from Redux store
  const { user } = useSelector((state: any) => state.user); // Assuming the user is stored in the auth slice

  console.log(user);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange', // Real-time validation
    defaultValues: {
      phoneNumber: '',
      country: '',
      city: '',
      address: '',
    },
  });

  // Watch form fields to disable submit if any field is empty
  const watchAllFields = watch();

  // Fetch cart items and set form values based on user data
  useEffect(() => {
    const fetchCartItemsAndSetUserData = async () => {
      let items = [];
      let totalPrice = 0;

      // Check if user is logged in and fetch cart items accordingly
      if (user?.user) {
        try {
          const response = await getCartItems();
          items = response.cartItems;
          totalPrice = response.totalPrice;

          // If user is logged in, populate form with user data
          setValue('phoneNumber', user.user.phoneNumber || '');
          setValue('country', user.user.address?.country || '');
          setValue('city', user.user.address?.city || '');
          setValue('address', user.user.address?.address || '');
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      } else {
        // If user is not logged in, get cart items from session storage
        const sessionCartItems = sessionStorage.getItem('cartItems');
        if (sessionCartItems) {
          items = JSON.parse(sessionCartItems);
          totalPrice = items.reduce((total: number, item: any) => total + item.price * item.amount, 0);
        }

        // Clear form values for non-authorized users
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

    // Prepare the order items based on cart items
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
        address: {
          country: formValues.country,
          city: formValues.city,
          address: formValues.address,
        },
        phoneNumber: formValues.phoneNumber,
      });
      push('/');
    } catch (error) {
      console.error('Error processing order:', error);
    } finally {
      setIsProcessing(false);
      setIsModalOpened(false);
      sessionStorage.removeItem('cartItems'); // Optionally clear session storage
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

          {/* Phone Number Input (using PhoneInput component with react-hook-form) */}
          <Controller
            name='phoneNumber'
            control={control}
            rules={{ required: 'Phone number is required' }}
            render={({ field }) => (
              <PhoneInput
                country={'us'}
                value={field.value}
                onChange={phone => field.onChange(phone)}
                containerClass={styles.phoneInputContainer}
                inputClass={styles.phoneInput}
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: true,
                }}
              />
            )}
          />
          {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber.message}</p>}

          {/* Country Input */}
          <Controller
            name='country'
            control={control}
            rules={{ required: 'Country is required' }}
            render={({ field }) => (
              <Input
                label='Country'
                {...field}
                error={errors.country?.message}
                placeholder='Enter your country'
              />
            )}
          />

          {/* City Input */}
          <Controller
            name='city'
            control={control}
            rules={{ required: 'City is required' }}
            render={({ field }) => (
              <Input
                label='City'
                {...field}
                error={errors.city?.message}
                placeholder='Enter your city'
              />
            )}
          />

          {/* Address Input */}
          <Controller
            name='address'
            control={control}
            rules={{ required: 'Address is required' }}
            render={({ field }) => (
              <Input
                label='Address'
                {...field}
                error={errors.address?.message}
                placeholder='Enter your address'
              />
            )}
          />

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
