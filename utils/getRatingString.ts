const getRatingString = (rating: number) => {
  const validRating = Math.min(Math.floor(rating), 5);
  let fullStars = '';

  for (let i = 0; i < validRating; i++) {
    fullStars += '★';
  }

  for (let i = fullStars.length; i < 5; i++) {
    fullStars += '☆';
  }

  return fullStars;
};

export default getRatingString;
