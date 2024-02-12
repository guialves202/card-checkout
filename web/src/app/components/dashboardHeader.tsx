import styles from './DashboardHeader.module.css'

export default function DashboardHeader() {
    return (
      <header className={styles.header}>
        <h1 className={styles.mainText}>Nú banco</h1>
        <div className={styles.accountInfo}>
            <ul className={styles.accountInfoItems}>
                <li><a>Agência: </a></li>
                <li><a>Conta: </a></li>
                <li><a>Saldo da conta: </a></li>
            </ul>
            <button className='bg-[blue] text-white rounded-[8px] p-[1rem]'>
              Meus cartões
            </button>
        </div>
      </header>
    );
  }
