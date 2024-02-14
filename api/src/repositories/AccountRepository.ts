import { PrismaClient } from '@prisma/client'
import { prisma } from '../lib/prisma'

import { Account, DebitCard } from '../types/models'

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

  async getAccountById(accountId: string) {
    try {
      return await this.ORM.account.findUnique({
        where: {
          id: accountId
        },
        include: {
          creditCard: true,
          debitCard: true,
          statement: true
        }
      })
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

  async depositMoney(amount: number, accountId: string) {
    try {
      await this.ORM.account.update({
        where: {
          id: accountId
        },
        data: {
          balance: {
            increment: amount
          }
        }
      })
      return
    }
    catch (err) {
      throw(err)
    }
  }

  async makePayment(amount: number, accountId: string) {
    await this.ORM.account.update({
      where: {
        id: accountId
      },
      data: {
        balance: {
          decrement: amount
        }
      }
    })

    await this.ORM.statement.create({
      data: {
        TransactionValue: amount,
        accountId,
      }
    })
  }
}

const accountRepository = new AccountRepository(prisma)
export { accountRepository, AccountRepository }
