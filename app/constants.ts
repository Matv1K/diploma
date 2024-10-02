export const ALL_SECTIONS = [
  { name: 'Guitars' },
  { name: 'Pianos' },
  { name: 'Drums' },
  { name: 'Cellos' },
  { name: 'Harmonicas' },
  { name: 'Wind Instruments' },
  { name: 'Ukuleles' },
  { name: 'Studio Equipment' },
  { name: 'Headphones' },
];

export const POPULAR_BRANDS = [
  { name: 'Taylor', id: 1 },
  { name: 'Fender', id: 2 },
  { name: 'Gibson', id: 5 },
  { name: 'Cort', id: 3 },
  { name: 'Flight', id: 4 },
];

export const ORDER_STATES = {
  REJECTED: 'rejected',
  DELIVERED: 'delivered',
  IN_PROGRESS: 'in progress',
};

export const TOAST_MESSAGES = {
  SIGN_IN_SUCCESS: 'Successfully logged in',
  SIGN_IN_ERROR: '',
  SIGN_UP_SUCCESS: 'Successfully signed up',
  SIGN_UP_ERROR: '',
  ADD_TO_CART_SUCCESS: 'Item has been added to your cart',
  ADD_TO_CART_ERROR: '',
  LIKE_ITEM_SUCCES: 'Item has been added to your favorites',
  LIKE_ITEM_ERROR: '',
  UNLIKE_ITEM_SUCCESS: 'Item has been removed from your favorites',
  UNLIKE_ITEM_ERROR: '',
  LEAVE_COMMENT_SUCCESS: '',
  LEAVE_COMMENT_ERROR: '',
  CHECKOUT_ITEMS_SUCCESS: 'Item has been ordered',
  CHECKOUT_ITEMS_ERROR: '',
  UPDATE_USER_SUCCESS: 'User has been updated',
  CHANGE_PASSWORD_SUCCESS: 'Your password has been changed',
  REMOVE_CART_ITEM_SUCCESS: 'Item has been removed from the cart',
  LOG_OUT_USER: 'You’ve been successfully logged out',
  CREATE_ORDER: 'Your order has been created',
};

export const CATALOG_LINKS = [
  {
    id: 1,
    link: 'Guitars',
    subtypes: [
      { name: 'Electric Guitars', slug: 'electric-guitars' },
      { name: 'Acoustic Guitars', slug: 'acoustic-guitars' },
      { name: 'Bass Guitars', slug: 'bass-guitars' },
      { name: 'Ukuleles', slug: 'ukuleles' },
    ],
  },
  {
    id: 2,
    link: 'Wind Instruments',
    subtypes: [
      { name: 'Saxophones', slug: 'saxophones' },
      { name: 'Flutes', slug: 'flutes' },
    ],
  },
  {
    id: 3,
    link: 'Drums',
    subtypes: [
      { name: 'Acoustic Drums', slug: 'acoustic-drums' },
      { name: 'Electric Drums', slug: 'electric-drums' },
    ],
  },
  {
    id: 4,
    link: 'Keyboards',
    subtypes: [
      { name: 'Pianos', slug: 'pianos' },
      { name: 'Synthesizers', slug: 'synthesizers' },
      { name: 'Midi', slug: 'midi' },
      { name: 'Digital Pianos', slug: 'digital-pianos' },
    ],
  },
  {
    id: 5,
    link: 'Studio Equipment',
    subtypes: [
      { name: 'Headphones', slug: 'headphones' },
      { name: 'Microphones', slug: 'microphones' },
    ],
  },
  {
    id: 6,
    link: 'Bowed',
    subtypes: [
      { name: 'Cellos', slug: 'cellos' },
      { name: 'Double Basses', slug: 'double-basses' },
      { name: 'Violins', slug: 'violins' },
    ],
  },
];
