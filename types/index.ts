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
  _id: string;
  color: string;
  image: string;
  price: string;
  name: string;
  amount: number;
  instrumentId: string;
  section: string;
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
