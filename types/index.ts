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

// ENUMS

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
