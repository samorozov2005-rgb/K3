import { Link } from 'react-router-dom';
import Rating from './Rating.jsx';

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <h2 className="product-card__title">
        <Link to={`/product/${product.id}`}>{product.title}</Link>
      </h2>
      <Rating rate={product.rating.rate} />
    </article>
  );
}

export default ProductCard;
