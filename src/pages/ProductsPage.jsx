import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';

const PRODUCTS_URL = 'https://fakestoreapi.com/products';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch(PRODUCTS_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError('Не удалось загрузить товары. Попробуйте обновить страницу.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, []);

  return (
    <main className="page-shell">
      <h1>Каталог товаров</h1>

      {isLoading && <p className="status-message">Загрузка товаров...</p>}
      {error && <p className="status-message status-message--error">{error}</p>}

      {!isLoading && !error && (
        <section className="products-grid" aria-label="Список товаров">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </section>
      )}
    </main>
  );
}

export default ProductsPage;
