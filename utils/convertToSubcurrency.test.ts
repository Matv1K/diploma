import convertToSubcurrency from './convertToSubcurrency';

describe('convertToSubcurrency', () => {
  it('should correctly convert the amount to subcurrency', () => {
    const amount = 12.34;
    const factor = 100;
    const result = convertToSubcurrency(amount, factor);
    expect(result).toBe(1234);
  });

  it('should handle amount with no decimals correctly', () => {
    const amount = 10;
    const result = convertToSubcurrency(amount);
    expect(result).toBe(1000);
  });

  it('should handle rounding correctly for smaller values', () => {
    const amount = 12.345;
    const factor = 100;
    const result = convertToSubcurrency(amount, factor);
    expect(result).toBe(1235);
  });

  it('should return 0 for an amount of 0', () => {
    const amount = 0;
    const result = convertToSubcurrency(amount);
    expect(result).toBe(0);
  });

  it('should handle a custom factor other than 100', () => {
    const amount = 5;
    const factor = 1000;
    const result = convertToSubcurrency(amount, factor);
    expect(result).toBe(5000);
  });
});
