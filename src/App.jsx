import { Navigate, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
