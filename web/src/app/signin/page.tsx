"use client"

import { useState } from 'react';
import Header from '../components/header';
import styles from './Signin.module.css'
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';

export default function Signin() {
  const [cpf, setCpf] = useState('')
  const [branch, setBranch] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const router = useRouter()

  const handleSignIn = async () => {
    try {
      const response = await api.post('/account/signin', {
        cpf,
        branch,
        accountNumber
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      localStorage.setItem("account", JSON.stringify(response.data));
      router.push('/dashboard')
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    <Header></Header>
      <main className="h-[80vh] flex justify-center items-center">
        <div className={styles.card}>
          <h1 className='text-5xl'>Sign In</h1>

          <div className={styles.mainForm}>
            <label>
              CPF:
              <input type='text' onChange={e => setCpf(e.target.value)}></input>
            </label>

            <label>
              Agência:
              <input type='text' onChange={e => setBranch(e.target.value)}></input>
            </label>

            <label>
              Conta bancária:
              <input type='text' onChange={e => setAccountNumber(e.target.value)}></input>
            </label>
          </div>

          <button className='bg-[blue] text-white p-[.6rem] rounded-[8px] text-[1.2rem] w-full'>Entrar</button>
        </div>
      </main>
    </>
  );
}
