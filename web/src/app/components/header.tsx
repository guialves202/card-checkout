"use client"

import styles from './Header.module.css'
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter()

  return (
    <header className={styles.header}>
      <h1 className={styles.mainText} onClick={e => router.push('/')}>Nú banco</h1>
      <div className={styles.nav}>
          <ul className={styles.navList}>
              <li><a onClick={e => router.push('/signup')}>Criar conta</a></li>
              <li><a onClick={e => router.push('/signin')}>Entrar</a></li>
          </ul>
      </div>
    </header>
  );
}
