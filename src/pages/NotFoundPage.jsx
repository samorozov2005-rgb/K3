import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="message-page">
      <h1>404 — Страница не найдена</h1>
      <p>Проверьте адрес страницы или вернитесь в каталог.</p>
      <Link className="button-link" to="/products">К списку товаров</Link>
    </main>
  );
}

export default NotFoundPage;
