'use client';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useUserStore } from '../store/userStore';
import ProductCard from './components/ProductCard';
import Loader from './components/Loader';
import styles from '../styles/Home.module.scss';

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
};

export default function HomePage() {
  const user = useUserStore((state) => state.user);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    api
      .get('/products?limit=12')
      .then((res) => setProducts(res.data.products))
      .catch(() => setError('Ошибка загрузки товаров'))
      .finally(() => setLoading(false));
  }, [mounted]);

  if (!mounted) return null;
  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
