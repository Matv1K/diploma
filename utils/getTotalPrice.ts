import { CartItemI } from "@/types";

const getTotalPrice = (items: CartItemI[]) => {
  const totalPrice = items.reduce((total: number, item: CartItemI) => {
    const price = parseFloat(item.price.replace("$", ""));

    return total + price * item.amount;
  }, 0);

  return totalPrice;
};

export default getTotalPrice;
