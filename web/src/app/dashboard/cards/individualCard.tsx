import { DebitCard, CreditCard } from '@/types/models';
import styles from './Cards.module.css'

export default function IndividualCard(cardData: DebitCard | CreditCard) {
  return (
    <div className='flex flex-col bg-slate-900 rounded-[10px] p-[1rem] h-[200px] w-[350px] text-white font-bold justify-between'>
      <h1>{ cardData.number }</h1>
      <div className='flex justify-between items-center'>
        <h1>{ cardData.ownerNameOnCard }</h1>
        <h1><small className='text-[10px] mr-1'>Secutiry code: </small>{ cardData.securityCode }</h1>
      </div>
    </div>
  );
}
