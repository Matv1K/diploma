// THERE SHOULD BE 5 MOST POPULAR SECTIONS

export const POPULAR_SECTIONS = [
  { name: "Guitars", id: 1 },
  { name: "Pianos", id: 2 },
  { name: "Drums", id: 4 },
  { name: "Cellos", id: 3 },
  { name: "Harmonicas", id: 5 },
];

export const ALL_SECTIONS = [
  { name: "Guitars" },
  { name: "Pianos" },
  { name: "Drums" },
  { name: "Cellos" },
  { name: "Harmonicas" },
  { name: "Wind Instruments" },
  { name: "Ukuleles" },
  { name: "Studio Equipment" },
  { name: "Headphones" },
];

// THERE SHOULD BE 10 MOST POPULAR INSTRUMENTS

export const POPULAR_ITEMS = [
  { name: "Fender CD60", id: 1 },
  { name: "Taylor 350", id: 2 },
  { name: "Martin OM-28", id: 3 },
  { name: "Takamine GY11ME Parlor", id: 4 },
  { name: "Taylor Academy 12e-N Nylon", id: 5 },
];

// THERE SHOULD BE 5 MOST POPULAR BRANDS

export const POPULAR_BRANDS = [
  { name: "Taylor", id: 1 },
  { name: "Fender", id: 2 },
  { name: "Gibson", id: 5 },
  { name: "Cort", id: 3 },
  { name: "Flight", id: 4 },
];

export const ORDER_STATES = {
  REJECTED: "rejected",
  DELIVERED: "delivered",
  IN_PROGRESS: "in progress",
};

export const ORDERS = [
  {
    id: "21ds255",
    items: [
      {
        id: 1,
        name: "Fender cd-60",
        price: 999,
        color: "yellow",
        image: "../../public/images/electric-guitar.webp",
      },
      {
        id: 2,
        name: "Martin 5d",
        price: 499,
        color: "brown",
        image: "../../public/images/electric-guitar.webp",
      },
    ],
    state: ORDER_STATES.DELIVERED,
  },
  {
    id: "21ds256",
    items: [
      {
        id: 1,
        name: "Cort d350",
        price: 399,
        color: "yellow",
        image: "../../public/images/electric-guitar.webp",
      },
    ],
    state: ORDER_STATES.IN_PROGRESS,
  },
  {
    id: "21ds257",
    items: [
      {
        id: 1,
        name: "Cort d350",
        price: 399,
        color: "yellow",
        image: "../../public/images/electric-guitar.webp",
      },
      {
        id: 1,
        name: "Cort d350",
        price: 399,
        color: "yellow",
        image: "../../public/images/electric-guitar.webp",
      },
    ],
    state: ORDER_STATES.DELIVERED,
  },
];

export const HEADER_LINKS = [{ href: "/shop", name: "Shop" }];

export const TOAST_MESSAGES = {
  SIGN_IN: "Successfully logged in",
  SIGN_UP: "Successfully signed up",
  ADD_TO_CART: "Item has been added to your cart",
};

export const NEW_ITEMS = [
  { name: "Aria Pro STG", id: 1 },
  { name: "Aria PRO 2", id: 2 },
  { name: "Aria PRO 1", id: 3 },
  { name: "Aria Bass KT-20", id: 4 },
  { name: "Aria Bass KT-50", id: 3 },
];

export const INSTRUMENTS = [
  { name: "Aria Pro STG", id: 1, price: "999$", instrumentType: "guitar" },
  { name: "Aria PRO 2", id: 2, price: "999$", instrumentType: "guitar" },
  { name: "Aria PRO 1", id: 3, price: "999$", instrumentType: "guitar" },
  { name: "Aria Bass KT-20", id: 4, price: "999$", instrumentType: "guitar" },
  { name: "Aria Bass KT-50", id: 5, price: "999$", instrumentType: "guitar" },
  { name: "Aria Pro STG", id: 6, price: "999$", instrumentType: "guitar" },
  { name: "Aria PRO 2", id: 7, price: "999$", instrumentType: "guitar" },
  { name: "Aria PRO 1", id: 8, price: "999$", instrumentType: "guitar" },
  { name: "Aria Bass KT-20", id: 9, price: "999$", instrumentType: "guitar" },
  { name: "Aria Bass KT-50", id: 10, price: "999$", instrumentType: "guitar" },
  { name: "Aria Pro STG", id: 11, price: "999$", instrumentType: "guitar" },
  { name: "Aria PRO 2", id: 12, price: "999$", instrumentType: "guitar" },
  { name: "Aria PRO 1", id: 13, price: "999$", instrumentType: "guitar" },
  { name: "Aria Bass KT-20", id: 14, price: "999$", instrumentType: "guitar" },
  { name: "Aria Bass KT-50", id: 15, price: "999$", instrumentType: "guitar" },
  { name: "Aria Pro STG", id: 16, price: "999$", instrumentType: "guitar" },
  { name: "Aria PRO 2", id: 17, price: "999$", instrumentType: "guitar" },
  { name: "Aria PRO 1", id: 18, price: "999$", instrumentType: "guitar" },
  { name: "Aria Bass KT-20", id: 19, price: "999$", instrumentType: "guitar" },
  { name: "Aria Bass KT-50", id: 20, price: "999$", instrumentType: "guitar" },
  { name: "Aria Pro STG", id: 21, price: "999$", instrumentType: "guitar" },
  { name: "Aria PRO 2", id: 22, price: "999$", instrumentType: "guitar" },
  { name: "Aria PRO 1", id: 23, price: "999$", instrumentType: "guitar" },
  { name: "Aria Bass KT-20", id: 24, price: "999$", instrumentType: "guitar" },
  { name: "Aria Bass KT-50", id: 25, price: "999$", instrumentType: "guitar" },
  { name: "Aria Pro STG", id: 26, price: "999$", instrumentType: "guitar" },
  { name: "Aria PRO 2", id: 27, price: "999$", instrumentType: "guitar" },
  { name: "Aria PRO 1", id: 28, price: "999$", instrumentType: "guitar" },
  { name: "Aria Bass KT-20", id: 29, price: "999$", instrumentType: "guitar" },
  { name: "Aria Bass KT-50", id: 30, price: "999$", instrumentType: "guitar" },
];

export const CATALOG_LINKS = [
  { link: "Guitars", id: 1 },
  { link: "Pianos", id: 2 },
  { link: "Harmonicas", id: 3 },
  { link: "Wind instruments", id: 9 },
  { link: "Drums", id: 4 },
  { link: "Cellos", id: 5 },
  { link: "Ukuleles", id: 6 },
  { link: "Studio Equipment", id: 7 },
  { link: "Headphones", id: 8 },
];
