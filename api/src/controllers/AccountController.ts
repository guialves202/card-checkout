import { Request, Response } from 'express'

import { Account, DebitCard } from '../types/models'
import { accountRepository, AccountRepository } from '../repositories/AccountRepository'
import { env } from '../env'
import { generateAccountNumber } from '../utils/generateAccountNumber'
import { CardRepository, cardRepository } from '../repositories/CardRepository'

class AccountController {
  constructor(private accountRepository: AccountRepository, private cardRepository: CardRepository) {
  }

  async create(req: Request, res: Response) {
    try {
      const { fullname, cpf } = req.body
      if (!fullname || !cpf) return res.sendStatus(400)

      const accountNumbersThatAlreadyExists = await this.accountRepository.getAllAccountNumbers()

      const accountNumber = generateAccountNumber(accountNumbersThatAlreadyExists)
      const accountBranch = env.ACCOUNTBRANCH

      const newAccount: Account = {
        ownerFullName: fullname,
        ownerCPF: cpf,
        branch: accountBranch,
        accountNumber,
        balance: 0
      }

      await this.accountRepository.create(newAccount)

      const accountCreated = await this.accountRepository.getAccountByBranchAndNumber(accountBranch, accountNumber)
      return res.status(201).json({ message: 'Account created successfully', accountCreated })
    }
    catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  }

  async signin(req: Request, res: Response) {
    try {
      const { cpf, branch, accountNumber } = req.body
      if (!branch || !accountNumber || !cpf) return res.sendStatus(400)

      const account = await this.accountRepository.getAccountByBranchAndNumber(branch, accountNumber)
      if (account.ownerCPF != cpf) return res.sendStatus(401)

      return res.status(200).json(account)
    }
    catch (err) {
      return res.status(500).json(err)
    }
  }

  async getAllAccounts(req: Request, res: Response) {
    try {
      const accounts = await this.accountRepository.getAllAccounts()
      return res.status(200).json(accounts)
    }
    catch (err) {
      return res.status(500).json(err)
    }
  }

  async getOneAccountById(req: Request, res: Response) {
    try {
      const { accountId } = req.body
      if (!accountId) return res.sendStatus(400)

      const account = await this.accountRepository.getAccountById(accountId)
      return res.status(200).json(account)
    }
    catch (err) {
      return res.status(500).json(err)
    }
  }

  async depositMoneyIntoAccount(req: Request, res: Response) {
    try {
      const { accountId, money } = req.body
      if (!accountId || !money || money <= 0) return res.sendStatus(400)

      await this.accountRepository.depositMoney(money, accountId)
      return res.status(200).json('Deposit made successfully')
    }
    catch (err) {
      return res.status(500).json(err)
    }
  }

  async makePaymentWithDebitCard(req: Request, res: Response) {
    try {
      const { paymentValue, account, debitCardId }: { paymentValue: number, account: Account, debitCardId: string } = req.body
      if (!paymentValue || !account || !debitCardId || paymentValue < 0) return res.sendStatus(400)

      const accountVerified = await this.accountRepository.getAccountById(account.id as string)
      const accountBalance = accountVerified?.balance
      const accountCards = await this.cardRepository.getCardsByAccount(account.id as string)

      if (accountBalance as number - paymentValue < 0) return res.status(400).json('The payment value is greater than the account balance')

      let cardExists = false
      accountCards.debitCards.map(card => {
        if (card.id == debitCardId) cardExists = true
      })
      if (!cardExists) return res.status(400).json('Invalid card')

      await this.accountRepository.makePayment(paymentValue, account.id as string)
      return res.status(200).json('Payment made successfully')
    }
    catch (err) {
      return res.status(500).json(err)
    }
  }
}

const accountController = new AccountController(accountRepository, cardRepository)
export { accountController }
