export type Account = {
  id?: string
  ownerFullName: string
  ownerCPF: string
  branch: string
  accountNumber: string
  balance: number
}

export type DebitCard = {
  id?: string
  number: string
  ownerNameOnCard: string
  securityCode: string
  accountId: string
}

export type CreditCard = {
  id?: string
  number: string
  ownerNameOnCard: string
  securityCode: string
  accountId?: string
  limit: number
  currentInvoice: number
}

export type Statement = {
  id?: string
  statementDate: Date
  TransactionValue: number
  accountId: string
}
