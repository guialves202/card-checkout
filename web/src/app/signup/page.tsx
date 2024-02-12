"use client";

import { useState } from 'react'
import styles from './Signup.module.css'
import { api } from '@/lib/axios'

export default function Signup() {
  const [fullname, setFullname] = useState('')
  const [cpf, setCpf] = useState('')

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
      console.log(response.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <main className="h-[100vh] flex justify-center items-center">
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
  );
}
