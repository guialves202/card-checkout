import { PrismaClient } from '@prisma/client'
import { prisma } from '../lib/prisma'

import { Account } from '../types/models'

class AccountRepository {
  private ORM: PrismaClient
  constructor(prisma: PrismaClient) {
    this.ORM = prisma
  }

  async create(accountData: Account) {
    try {
      await this.ORM.account.create({
        data: accountData
      })
      return
    }
    catch (err) {
      throw(err)
    }
  }

  async getAllAccounts() {
    try {
      return await this.ORM.account.findMany()
    }
    catch (err) {
      throw(err)
    }
  }

  async getAllAccountNumbers() {
    try {
      const accountNumbers = await this.ORM.account.findMany({
        select: {
          accountNumber: true
        }
      })
      return accountNumbers
    }
    catch (err) {
      throw(err)
    }
  }

  async getAccountByBranchAndNumber(branch: string, accountNumber: string) {
    try {
      const account = await this.ORM.account.findFirst({
        where: {
          branch,
          AND: {
            accountNumber
          }
        }
      })
      if (!account) throw new Error('Account not found')
      return account
    }
    catch (err) {
      throw(err)
    }
  }
}

const accountRepository = new AccountRepository(prisma)
export { accountRepository, AccountRepository }
