export interface InstrumentI {
  _id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  isNew?: boolean;
  section: string;
  brandName: string;
  salePrice?: string;
  onSale?: boolean;
  bought?: number;
  colors: string[];
  characteristics?: Record<string, any>;
}

export interface InstrumentCardI {
  _id: string;
  name: string;
  section: string;
  price: string;
  instrumentType: string;
  isNew: boolean;
  image: string;
  brandName: string;
  colors: string[];
  instrumentId: string;
}

export interface CartItemI {
  color: string;
  image: string;
  price: string;
  name: string;
  amount: number;
  instrumentId: string;
  section: string;
  brandName: string;
}

export interface CartItemIdI {
  _id: string;
  color: string;
  image: string;
  price: string;
  name: string;
  amount: number;
  instrumentId: string;
  section: string;
  brandName: string;
}

export interface LikedItemI {
  _id?: string;
  name: string;
  image: string;
  brandName: string | undefined;
  colors: string[];
  userId?: string;
  instrumentId: string;
  section: string;
  amount?: number;
  price: string;
}

export interface OrderItemI {
  name: string;
  price: string;
  color: string;
  amount: number;
  _id: string;
  instumentId: string;
}

export interface OrderI {
  _id: string;
  userId: string;
  items: OrderItemI[];
  status: string;
  totalPrice: number;
}

export interface SignUpDataI {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInDataI {
  email: string;
  password: string;
}

export enum ButtonOptions {
  OUTILINE = "outline",
  FILLED = "filled",
  GOOGLE = "google",
}

export enum ButtonTypes {
  SUBMIT = "submit",
  RESET = "reset",
}

export enum InputTypes {
  TEXT = "text",
  EMAIL = "email",
  PASSWORD = "password",
  SEARCH = "search",
}
