"use client";

import { Account } from '@/types/models';
import styles from './DashboardHeader.module.css'
import { useEffect, useState } from 'react';

export default function DashboardHeader() {
  const [account, setAccount] = useState<Account>()

  useEffect(() => {
    const account: Account = JSON.parse(localStorage.getItem('account') as string)
    setAccount(account)

    window.addEventListener('click', (event: Event) => {
      const depositModal = document.querySelector('.depositModal') as HTMLDivElement
      const paymentModal = document.querySelector('.paymentModal') as HTMLDivElement
      if (event.target == depositModal) depositModal.style.display = 'none'
      if (event.target == paymentModal) paymentModal.style.display = 'none'
    })
  }, [])

  function openDepositModal() {
    const modal = document.querySelector('.depositModal') as HTMLDivElement
    modal.style.display = 'flex'
  }

  function openPaymentModal() {
    const modal = document.querySelector('.paymentModal') as HTMLDivElement
    modal.style.display = 'flex'
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.mainText}>Nú banco</h1>
      <div className={styles.accountInfo}>
        <ul className={styles.accountInfoItems}>
            <li><a>Agência: { account?.branch }</a></li>
            <li><a>Conta: { account?.accountNumber }</a></li>
            <li><a>Saldo da conta: { account?.balance }</a></li>
        </ul>
      </div>
      <div className='flex gap-10'>
        <button onClick={openPaymentModal}>
          Realizar pagamento
        </button>
        <button onClick={openDepositModal}>
          Depositar
        </button>
        <button className='bg-[blue] text-white rounded-[8px] py-[.8rem] px-[2rem] hover:brightness-90 hover:scale-105 transition-all duration-200 ease'>
          Sair
        </button>
      </div>
    </header>
  );
}
