"use client";

import { useEffect, useState } from 'react';
import styles from './Cards.module.css'
import { api } from '@/lib/axios'
import { Account, CreditCard, DebitCard } from '@/types/models';
import IndividualCard from './individualCard';

export default function Cards() {
  const [account, setAccount] = useState<Account>()
  const [cards, setCards] = useState<{ creditCards: CreditCard[], debitCards: DebitCard[] }>()

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
    }

    getCards()
  }, [cards?.creditCards.length,cards?.debitCards.length])

  const handleGetDebitCard = async () => {
    await api.post('/cards/debit/create', {
      accountId: account?.id,
      fullname: account?.ownerFullName
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await api.post('/cards', {
      accountId: account?.id
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setCards(response.data.cards)
  }

  const handleGetCreditCard = async () => {
    await api.post('/cards/credit/create', {
      accountId: account?.id,
      fullname: account?.ownerFullName
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await api.post('/cards', {
      accountId: account?.id
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setCards(response.data.cards)
  }

  return (
    <main>
      <div>
        {
          (cards?.creditCards.length as number > 0 || cards?.debitCards.length as number > 0) ?
          <div className='grid grid-cols-[49%,2px,49%] grid-rows-1 p-6 gap-4 justify-center'>
            <div className='flex flex-col items-center gap-5'>
              <h1 className='text-2xl font-bold'>Cartões de débito</h1>
              <div className={styles.mainGrid}>
                {
                  cards?.debitCards.map((card,index)=> {
                    return (
                      <IndividualCard
                      key={index}
                      {...card}
                      >
                      </IndividualCard>
                    )
                  })
                }
              </div>
            </div>

            <div className='w-[2px] h-full bg-slate-900 rounded-lg'></div>

            <div className='flex flex-col items-center gap-5'>
              <h1 className='text-2xl font-bold'>Cartões de crédito</h1>
              <div className={styles.mainGrid}>
              {
                  cards?.creditCards.map((card,index)=> {
                    return (
                      <IndividualCard
                      key={index}
                      {...card}
                      >
                      </IndividualCard>
                    )
                  })
                }
                <button className='main-btn' onClick={handleGetCreditCard}>Pedir outro cartão</button>
              </div>
            </div>
          </div>
          :
          <div className='flex flex-col gap-[5rem] mt-[8rem] mx-auto w-[50%] items-center justify-center'>
            <h1 className='text-5xl font-bold text-center'>Você não possui nenhum cartão</h1>
            <div className='flex gap-10 items-center justify-center'>
              <button className='main-btn' onClick={handleGetDebitCard}>Pedir cartão de débito</button>
              <button className='main-btn'>Pedir cartão de crédito</button>
            </div>
          </div>
        }
      </div>
    </main>
  )
}
