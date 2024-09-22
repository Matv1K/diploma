const getRatingString = (rating: number) => {
  let fullStars = '';

  for (let i = 0; i < rating; i++) {
    fullStars += '★';
  }

  for (let i = fullStars.length; i < 5; i++) {
    fullStars += '☆';
  }

  return fullStars;
};

export default getRatingString;
