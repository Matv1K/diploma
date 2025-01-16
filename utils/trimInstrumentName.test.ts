import trimInstrumentName from './trimInstrumentName';

describe('trimInstrumentName', () => {
  it('should trim and format a name with multiple words correctly', () => {
    const input = 'Electric Guitar';
    const expectedOutput = 'electric-guitar';
    expect(trimInstrumentName(input)).toBe(expectedOutput);
  });

  it('should handle a single word name correctly', () => {
    const input = 'Piano';
    const expectedOutput = 'piano';
    expect(trimInstrumentName(input)).toBe(expectedOutput);
  });

  it('should handle extra spaces between words', () => {
    const input = '  Acoustic   Guitar  ';
    const expectedOutput = 'acoustic-guitar';
    expect(trimInstrumentName(input)).toBe(expectedOutput);
  });

  it('should handle an empty string gracefully', () => {
    const input = '';
    const expectedOutput = '';
    expect(trimInstrumentName(input)).toBe(expectedOutput);
  });

  it('should handle names with special characters', () => {
    const input = 'Drum Kit!';
    const expectedOutput = 'drum-kit!';
    expect(trimInstrumentName(input)).toBe(expectedOutput);
  });

  it('should handle names with a single character', () => {
    const input = 'A';
    const expectedOutput = 'a';
    expect(trimInstrumentName(input)).toBe(expectedOutput);
  });

  it('should handle names with multiple spaces and no words', () => {
    const input = '      ';
    const expectedOutput = '';
    expect(trimInstrumentName(input)).toBe(expectedOutput);
  });
});
