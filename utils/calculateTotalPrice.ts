const calculateTotalPrice = (items: any) => {
  return items.reduce((acc: number, item: any) => {
    return item.price + acc;
  }, 0);
};

export default calculateTotalPrice;
