'use client';
import Link from 'next/link';
import styles from '../../styles/Header.module.scss';
import { useUserStore } from '../../store/userStore';
import { useEffect, useState } from 'react';

export default function Header() {
  const { user, logout } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className={styles.header}>
      <div className={styles.logo}>AbeloHost</div>
      <nav>
        {!user ? (
          <Link href="/login" className={styles.link}>Login</Link>
        ) : (
          <div className={styles.userBlock}>
            <span>
              {user.firstName} {user.lastName}
            </span>
            <button className={styles.logout} onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
