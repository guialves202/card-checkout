"use client";

import { ChangeEvent, useEffect, useState } from 'react';
import styles from './Modal.module.css'
import { api } from '@/lib/axios';
import { Account, CreditCard, DebitCard } from '@/types/models';

export default function PaymentModal() {
  const [amount, setAmount] = useState<number>()
  const [account, setAccount] = useState<Account>()
  const [cards, setCards] = useState<{ creditCards: CreditCard[], debitCards: DebitCard[] }>()
  const [cardId, setCardId] = useState<string>()

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem('account') as string)
    setAccount(account)
    const getCards = async () => {
      const response = await api.post('/cards', {
        accountId: account.id
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setCards(response.data)
      setCardId(response.data.debitCards[0].id)
    }

    getCards()
  }, [])

  function closeModal() {
    const modal = document.querySelector('.paymentModal') as HTMLDivElement
    modal.style.display = 'none'
  }

  const handlePayment = async () => {
    await api.post('/account/payment/debitcard', {
      account: account,
      paymentValue: amount,
      debitCardId: cardId
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

  function changeStatus(e: ChangeEvent<HTMLSelectElement>) {
    setCardId(e.target.value);
  }

  return (
    <div className="modal paymentModal">
      <div className="modal-content relative w-[40%]">
        <span onClick={closeModal} className="absolute top-2 right-2 text-3xl cursor-pointer rounded-[50%] p-[1px] hover:text-[red] hover:bg-primary">&times;</span>
        <div className="flex flex-col gap-6 items-center justify-between w-full min-h-[40vh]">
          <div className='flex items-center justify-center gap-5 flex-col'>
            <h1 className='text-2xl font-bold'>Valor do pagamento</h1>
          </div>
          <input type='number' onChange={e => setAmount(Number(e.target.value))} className='w-[60%] border-1 border-black border-solid rounded py-2 px-4 text-[1.2rem] outline' />
          <label className='text-xl'>
            Cartão para pagamento:
            <select id="paymentcards" name="paymentcards" onChange={changeStatus} className='border-1 border-black border-solid rounded py-2 px-4 text-[1.2rem] outline ml-5'>
            {
              cards?.debitCards.map((card,index)=> {
                return (
                  <option key={index} value={card.id}>{card.number} - Débito</option>
                )
              })
            }
          </select>
          </label>

          <button className="text-[1.2rem] bg-[blue] rounded-[8px] py-[1rem] px-[4rem] text-white" onClick={handlePayment}>Pagar</button>
        </div>
      </div>
    </div>
  );
}
