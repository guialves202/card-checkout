import DashboardHeader from './header/dashboardHeader'
import styles from './Dashboard.module.css'
import Cards from './cards/cards'
import DepositModal from './modal/depositModal'
import PaymentModal from './modal/paymentModal'

export default function Dashboard() {
  return (
    <main>
      <DepositModal></DepositModal>
      <PaymentModal></PaymentModal>
      <DashboardHeader></DashboardHeader>
      <Cards></Cards>
    </main>
  )
}
