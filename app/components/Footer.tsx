'use client';
import styles from '../../styles/Footer.module.scss';
import { useUserStore } from '../../store/userStore';
import { useEffect, useState } from 'react';

export default function Footer() {
  const user = useUserStore((state) => state.user);
  const year = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className={styles.footer}>
      <span>{year}</span>
      {user && <span>Logged as {user.email}</span>}
    </footer>
  );
}
