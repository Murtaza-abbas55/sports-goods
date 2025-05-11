import React from 'react';
import { Star, StarHalf, Star as StarOutline } from 'lucide-react';

const StarRating = ({ rating }) => {
  console.log(rating);
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  // Log the values to see the logic in action
  console.log(`Full Stars: ${fullStars}, Half Star: ${halfStar}, Empty Stars: ${emptyStars}`);

  return (
    <div style={{ display: 'flex', gap: '5px', color: '#FFD700' }}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} fill="currentColor" stroke="currentColor" size={18} />
      ))}
      {halfStar && <StarHalf size={18} />}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOutline key={`empty-${i}`} size={18} />
      ))}
    </div>
  );
};

export default StarRating;
