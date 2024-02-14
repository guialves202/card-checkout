"use client";

import { useState } from 'react'
import styles from './Signup.module.css'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation';
import Header from '../components/header';

export default function Signup() {
  const [fullname, setFullname] = useState('')
  const [cpf, setCpf] = useState('')
  const router = useRouter()

  const handleCreateAccount = async () => {
    try {
      const response = await api.post('/account/create', {
        fullname,
        cpf
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      localStorage.setItem("account", JSON.stringify(response.data.accountCreated));
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
          <h1 className='text-5xl'>Sign Up</h1>

          <div className={styles.mainForm}>
            <label>
              Nome completo:
              <input type='text' onChange={e => setFullname(e.target.value)} />
            </label>

            <label>
              CPF:
              <input type='text' onChange={e => setCpf(e.target.value)} />
            </label>
          </div>

          <button className='bg-[blue] text-white p-[.6rem] rounded-[8px] text-[1.2rem] w-full' onClick={handleCreateAccount}>Criar conta</button>
        </div>
      </main>
    </>
  );
}
