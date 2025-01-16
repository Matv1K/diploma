import getTotalPrice from './getTotalPrice';
import { CartItemI } from '@/types';

const mockItem = (overrides?: Partial<CartItemI>): CartItemI => ({
  price: 0,
  amount: 0,
  color: 'black',
  image: 'default-image.jpg',
  name: 'Test Item',
  section: 'Test section',
  instrumentId: 'default-id',
  brandName: 'Test Brand Name',
  instrumentType: 'Test Instrument Type',
  ...overrides,
});

describe('getTotalPrice', () => {
  it('should return 0 for an empty cart', () => {
    const items: CartItemI[] = [];
    expect(getTotalPrice(items)).toBe(0);
  });

  it('should calculate the total price correctly for one item', () => {
    const items: CartItemI[] = [
      mockItem({ price: 50, amount: 2 }),
    ];
    expect(getTotalPrice(items)).toBe(100);
  });

  it('should calculate the total price correctly for multiple items', () => {
    const items: CartItemI[] = [
      mockItem({ price: 30, amount: 3 }),
      mockItem({ price: 10, amount: 5 }),
    ];
    expect(getTotalPrice(items)).toBe(140);
  });

  it('should handle items with zero amount or price', () => {
    const items: CartItemI[] = [
      mockItem({ price: 20, amount: 0 }),
      mockItem({ price: 0, amount: 5 }),
    ];
    expect(getTotalPrice(items)).toBe(0);
  });

  it('should handle decimal prices correctly', () => {
    const items: CartItemI[] = [
      mockItem({ price: 19.99, amount: 2 }),
    ];
    expect(getTotalPrice(items)).toBeCloseTo(39.98, 2);
  });

  it('should return the correct total for a cart with one high-priced item', () => {
    const items: CartItemI[] = [
      mockItem({ price: 1000, amount: 1 }),
    ];
    expect(getTotalPrice(items)).toBe(1000);
  });
});
