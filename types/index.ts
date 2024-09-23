export interface CommentI {
  _id: string,
  createdAt: string,
  description: string,
  userName: string,
  rating: number
}

export interface CartItemWithIdI {
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
  characteristics?: Record<string, string>;
  instrumentType: string;
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
  price: number;
  color: string;
  amount: number;
  _id: string;
  instrumentId: string;
}

export interface OrderI {
  _id: string;
  userId: string;
  items: OrderItemI[];
  status: string;
  totalPrice: number;
}

export enum ButtonOptions {
  _OUTILINE = 'outline',
  _FILLED = 'filled',
  _GOOGLE = 'google',
}

export enum ButtonTypes {
  _SUBMIT = 'submit',
  _RESET = 'reset',
}

export enum InputTypes {
  _TEXT = 'text',
  _EMAIL = 'email',
  _PASSWORD = 'password',
  _SEARCH = 'search',
}
