import { PrismaClient } from '@prisma/client'
import { prisma } from '../lib/prisma'

import { DebitCard, CreditCard } from '../types/models'

class CardRepository {
  private ORM: PrismaClient
  constructor(prisma: PrismaClient) {
    this.ORM = prisma
  }

  async createDebitCard(cardData: DebitCard) {
    try {
      await this.ORM.debitCard.create({
        data: cardData
      })
      return
    }
    catch (err) {
      throw(err)
    }
  }

  async createCreditCard(cardData: CreditCard) {
    try {
      await this.ORM.creditCard.create({
        data: cardData
      })
      return
    }
    catch (err) {
      throw(err)
    }
  }

  async getAllCardNumbers() {
    try {
      const creditCards = await this.ORM.creditCard.findMany({
        select: {
          number: true
        }
      })

      const debitCards = await this.ORM.debitCard.findMany({
        select: {
          number: true
        }
      })

      const cardNumbers = creditCards.concat(debitCards)
      return cardNumbers
    }
    catch (err) {
      throw(err)
    }
  }

  async getCardsByAccount(accountId: string) {
    try {
      const creditCards = await this.ORM.creditCard.findMany({
        where: {
          accountId
        }
      })

      const debitCards = await this.ORM.debitCard.findMany({
        where: {
          accountId
        }
      })

      const cards = {
        creditCards,
        debitCards
      }

      return cards
    }
    catch (err) {
      throw(err)
    }
  }

  async getDebitCardById(cardId: string) {
    try {
      return await this.ORM.debitCard.findUnique({
        where: {
          id: cardId
        }
      })
    }
    catch (err) {
      throw(err)
    }
  }

  async getCreditCardById(cardId: string) {
    try {
      return await this.ORM.creditCard.findUnique({
        where: {
          id: cardId
        }
      })
    }
    catch (err) {
      throw(err)
    }
  }
}

const cardRepository = new CardRepository(prisma)
export { cardRepository, CardRepository }
