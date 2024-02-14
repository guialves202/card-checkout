"use client";

import { useEffect, useState } from 'react';
import styles from './Modal.module.css'
import { api } from '@/lib/axios';
import { Account } from '@/types/models';

export default function DepositModal() {
  const [amount, setAmount] = useState<number>()
  const [account, setAccount] = useState<Account>()

  useEffect(() => {
    const account: Account = JSON.parse(localStorage.getItem('account') as string)
    setAccount(account)
  }, [])

  function closeModal() {
    const modal = document.querySelector('.depositModal') as HTMLDivElement
    modal.style.display = 'none'
  }

  const handleDeposit = async () => {
    await api.post('/account/deposit', {
      accountId: account?.id,
      money: amount
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await api.post('/accounts/account/getbyid', {
      accountId: account?.id
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setAccount(response.data)
    localStorage.setItem("account", JSON.stringify(response.data));
    window.location.reload()
  }

  return (
    <div className="modal depositModal">
      <div className="modal-content relative w-[30%]">
        <span onClick={closeModal} className="absolute top-2 right-2 text-3xl cursor-pointer rounded-[50%] p-[1px] hover:text-[red] hover:bg-primary">&times;</span>
        <div className="flex flex-col gap-6 items-center justify-between w-full min-h-[30vh]">
          <div className='flex items-center justify-center gap-5 flex-col'>
            <h1 className='text-2xl font-bold'>Digite um valor para depositar na conta</h1>
            <p className='text-[12px]'>Normalmente aqui você pagaria um boleto, faria um pix, ou uma transferência, então finge q vc fez isso pro valor cair na conta</p>
          </div>
          <input type='number' onChange={e => setAmount(Number(e.target.value))} className='border-1 border-black border-solid rounded py-2 px-4 text-[1.2rem] outline' />
          <button className="main-btn" onClick={handleDeposit}>Depositar</button>
        </div>
      </div>
    </div>
  );
}
