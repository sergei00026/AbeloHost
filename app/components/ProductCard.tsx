'use client';
import styles from '../../styles/ProductCard.module.scss';
import { useUserStore } from '../../store/userStore';

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const user = useUserStore((state) => state.user);

  return (
    <div className={styles.card}>
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.category}</p>
      <span>${product.price}</span>
      {user && <button>Add to cart</button>}
    </div>
  );
}
