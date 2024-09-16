const getTotalPrice = (items: any) => {
  const totalPrice = items.reduce((total: number, item: any) => {
    const price = parseFloat(item.price.replace("$", ""));

    return total + price * item.amount;
  }, 0);

  return totalPrice;
};

export default getTotalPrice;
