import { Request, Response } from 'express'

import { Account } from '../types/models'
import { accountRepository, AccountRepository } from '../repositories/AccountRepository'
import { env } from '../env'
import { generateAccountNumber } from '../utils/generateAccountNumber'

class AccountController {
  constructor(private repository: AccountRepository) {
  }

  async create(req: Request, res: Response) {
    try {
      const { fullname, cpf } = req.body
      if (!fullname || !cpf) return res.sendStatus(400)

      const accountNumbersThatAlreadyExists = await this.repository.getAllAccountNumbers()

      const accountNumber = generateAccountNumber(accountNumbersThatAlreadyExists)
      const accountBranch = env.ACCOUNTBRANCH

      const newAccount: Account = {
        ownerFullName: fullname,
        ownerCPF: cpf,
        branch: accountBranch,
        accountNumber,
        balance: 0
      }

      await this.repository.create(newAccount)
      return res.status(201).json({ message: 'Account created successfully', accountNumber, accountBranch })
    }
    catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  }

  async getAllAccounts(req: Request, res: Response) {
    try {
      const accounts = await this.repository.getAllAccounts()
      return res.status(200).json(accounts)
    }
    catch (err) {
      return res.status(500).json(err)
    }
  }
}

const accountController = new AccountController(accountRepository)
export { accountController }
