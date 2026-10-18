function Rating({ rate }) {
  const filledStars = Math.max(0, Math.min(5, Math.round(Number(rate) || 0)));

  return (
    <div className="rating" aria-label={`Рейтинг: ${filledStars} из 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          className={star <= filledStars ? 'star star--filled' : 'star'}
          aria-hidden="true"
          key={star}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default Rating;
