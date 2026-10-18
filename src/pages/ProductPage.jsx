import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Rating from '../components/Rating.jsx';

const PRODUCTS_URL = 'https://fakestoreapi.com/products';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      try {
        const response = await fetch(`${PRODUCTS_URL}/${id}`, {
          signal: controller.signal,
        });

        if (response.status === 404) {
          setNotFound(true);
          return;
        }

        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const responseText = await response.text();

        if (!responseText) {
          setNotFound(true);
          return;
        }

        const data = JSON.parse(responseText);

        if (!data || !data.id) {
          setNotFound(true);
          return;
        }

        setProduct(data);
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError('Не удалось загрузить товар. Попробуйте обновить страницу.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => controller.abort();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <p className="status-message page-shell">Загрузка товара...</p>;
  }

  if (notFound) {
    return (
      <main className="message-page">
        <h1>Товар не найден</h1>
        <p>Товара с таким идентификатором не существует.</p>
        <Link className="button-link" to="/products">К списку товаров</Link>
      </main>
    );
  }

  if (error) {
    return (
      <main className="message-page">
        <h1>Ошибка загрузки</h1>
        <p className="status-message status-message--error">{error}</p>
        <Link className="button-link" to="/products">К списку товаров</Link>
      </main>
    );
  }

  return (
    <main className="page-shell product-page">
      <article className="product-details">
        <h1>{product.title}</h1>
        <img
          className="product-details__image"
          src={product.image}
          alt={product.title}
        />
        <p className="product-details__price">${product.price}</p>
        <p className="product-details__description">{product.description}</p>
        <Rating rate={product.rating.rate} />
      </article>
      <button className="back-button" type="button" onClick={handleBack}>
        НАЗАД
      </button>
    </main>
  );
}

export default ProductPage;
