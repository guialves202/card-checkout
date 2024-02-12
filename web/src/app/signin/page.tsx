import styles from './Signin.module.css'

export default function Signin() {
  return (
    <main className="h-[100vh] flex justify-center items-center">
      <div className={styles.card}>
        <h1 className='text-5xl'>Sign In</h1>

        <div className={styles.mainForm}>
          <label>
            CPF:
            <input type='text'></input>
          </label>

          <label>
            Agência:
            <input type='text'></input>
          </label>

          <label>
            Conta bancária:
            <input type='text'></input>
          </label>
        </div>

        <button className='bg-[blue] text-white p-[.6rem] rounded-[8px] text-[1.2rem] w-full'>Entrar</button>
      </div>
    </main>
  );
}
  