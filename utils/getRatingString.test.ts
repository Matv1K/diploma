import getRatingString from './getRatingString';

describe('getRatingString', () => {
  it('should return 5 full stars for rating of 5', () => {
    expect(getRatingString(5)).toBe('★★★★★');
  });

  it('should return 4 full stars and 1 empty star for rating of 4', () => {
    expect(getRatingString(4)).toBe('★★★★☆');
  });

  it('should return 3 full stars and 2 empty stars for rating of 3', () => {
    expect(getRatingString(3)).toBe('★★★☆☆');
  });

  it('should return 2 full stars and 3 empty stars for rating of 2', () => {
    expect(getRatingString(2)).toBe('★★☆☆☆');
  });

  it('should return 1 full star and 4 empty stars for rating of 1', () => {
    expect(getRatingString(1)).toBe('★☆☆☆☆');
  });

  it('should return 0 full stars and 5 empty stars for rating of 0', () => {
    expect(getRatingString(0)).toBe('☆☆☆☆☆');
  });

  it('should handle rating values greater than 5 by returning 5 full stars', () => {
    expect(getRatingString(6)).toBe('★★★★★');
  });

  it('should handle non-integer rating values by rounding them down', () => {
    expect(getRatingString(4.7)).toBe('★★★★☆');
  });

  it('should handle negative rating values by returning 0 full stars', () => {
    expect(getRatingString(-1)).toBe('☆☆☆☆☆');
  });
});
