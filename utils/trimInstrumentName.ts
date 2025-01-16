const trimInstrumentName = (name: string) => {
  const words = name
    .split(' ')
    .filter((word) => word.trim() !== '');

  if (words.length > 1) {
    return words
      .map((word, ind) => {
        if (ind !== 0) {
          return `-${word.trim().toLocaleLowerCase()}`;
        }
        return word.trim().toLocaleLowerCase();
      })
      .join('');
  }

  return words
    .join('')
    .split('')
    .map((part: string) => part.trim().toLocaleLowerCase())
    .join('');
};

export default trimInstrumentName;
