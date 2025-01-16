import removeSeparator from './removeSeparator';

describe('removeSeparator', () => {
  it('should replace all hyphens with spaces in a string', () => {
    const input = 'hello-world-how-are-you';
    const expectedOutput = 'hello world how are you';
    expect(removeSeparator(input)).toBe(expectedOutput);
  });

  it('should return the original string if no hyphens are present', () => {
    const input = 'hello world';
    const expectedOutput = 'hello world';
    expect(removeSeparator(input)).toBe(expectedOutput);
  });

  it('should return an empty string when given an empty string', () => {
    const input = '';
    const expectedOutput = '';
    expect(removeSeparator(input)).toBe(expectedOutput);
  });

  it('should return undefined if the input is undefined', () => {
    const input = undefined;
    expect(removeSeparator(input)).toBeUndefined();
  });

  it('should return null if the input is null', () => {
    const input = null;
    expect(removeSeparator(input)).toBeNull();
  });
});
