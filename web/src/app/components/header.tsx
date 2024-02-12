import styles from './Header.module.css'

export default function Header() {
    return (
      <header className={styles.header}>
        <h1 className={styles.mainText}>Nú banco</h1>
        <div className={styles.nav}>
            <ul className={styles.navList}>
                <li><a>Criar conta</a></li>
                <li><a>Entrar</a></li>
            </ul>
        </div>
      </header>
    );
  }
  