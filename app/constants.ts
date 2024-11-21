export const BRANDS = [
  'Yamaha', 'Gibson',
  'Fender', 'Roland',
  'Ibanez', 'Conductor',
  'Rockdale', 'John Packer',
  'Mirra', 'Flight', 'Brahner',
  'Casio', 'Foix', 'Behringer', 'AKG', 'Gretsch', 'Soundking',
];

export const NORMALIZED_BRANDS = [
  { name: 'guitars', brands: ['Ibanez', 'Rockdale', 'Fender', 'Roland', 'Flight', 'Baton', 'Cort'] },
  { name: 'wind-instruments', brands: ['Conductor', 'John Packer'] },
  { name: 'drums', brands: ['Foix', 'Behringer', 'Soundking', 'Gretsch'] },
  { name: 'pianos', brands: ['Casio', 'Medeli'] },
  { name: 'studio-equipment', brands: ['Alctron', 'AKG', 'Beyerdynamic'] },
  { name: 'bowed', brands: ['Mirra', 'Brahner', 'Cervini'] },
];

export const PRICE_RANGES = [
  { label: 'Under $1000', min: 0, max: 1000 },
  { label: '$1000 - $2000', min: 1000, max: 2000 },
  { label: '$2000 - $5000', min: 2000, max: 5000 },
  { label: 'Above $5000', min: 5000, max: Infinity },
];

export const FILTERS = [
  { label: 'By popularity', value:  'most_popular' },
  { label: 'By rating', value: 'by_rating' },
  { label: 'The most expensive', value: 'most_expensive' },
  { label: 'The cheapest', value:  'cheapest' },
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
  CREATE_ORDER: 'Your order has been accepted',
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
    link: 'Pianos',
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
      { name: 'Violins', slug: 'violins' },
    ],
  },
];
