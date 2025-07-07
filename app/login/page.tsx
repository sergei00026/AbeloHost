'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../utils/api';
import { useUserStore } from '../../store/userStore';
import Loader from '../components/Loader';
import styles from '../../styles/Login.module.scss';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username.length < 3 || password.length < 3) {
      setError('Минимум 3 символа в каждом поле');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/login', {
        username,
        password,
      });
      const { accessToken, refreshToken, id, firstName, lastName, email, username: uname } = res.data;
      setUser({
        id,
        firstName,
        lastName,
        email,
        username: uname,
        accessToken,
        refreshToken,
      });
      router.push('/');
    } catch (err: any) {
      setError('Неверный логин или пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          minLength={3}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          minLength={3}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? <Loader /> : 'Login'}
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
}
