import { Request, Response } from 'express'

import { CreditCard, DebitCard } from '../types/models'
import { accountRepository, AccountRepository } from '../repositories/AccountRepository'
import { cardRepository, CardRepository } from '../repositories/CardRepository'
import { generateCardNumber, generateCardSecurityCode } from '../utils/generateCardData'

class CardController {
  constructor(private cardRepository: CardRepository, private accountRepository: AccountRepository) {
  }

  async createDebitCard(req: Request, res: Response) {
    try {
      const { accountId, fullname } = req.body
      if (!accountId || !fullname) return res.sendStatus(400)

      const debitCardNumbersThatAlreadyExists = await this.cardRepository.getAllCardNumbers()

      const cardNumber = generateCardNumber(debitCardNumbersThatAlreadyExists)
      const cardSecurityCode = generateCardSecurityCode()

      const newDebitCard: DebitCard = {
        ownerNameOnCard: fullname,
        number: cardNumber,
        securityCode: cardSecurityCode,
        accountId: accountId
      }

      await this.cardRepository.createDebitCard(newDebitCard)
      return res.status(201).json('Debit card created successfully')
    }
    catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  }

  async createCreditCard(req: Request, res: Response) {
    try {
      const { accountId, fullname } = req.body
      if (!accountId || !fullname) return res.sendStatus(400)

      const creditCardNumbersThatAlreadyExists = await this.cardRepository.getAllCardNumbers()

      const cardNumber = generateCardNumber(creditCardNumbersThatAlreadyExists)
      const cardSecurityCode = generateCardSecurityCode()

      const newCreditCard: CreditCard = {
        ownerNameOnCard: fullname,
        number: cardNumber,
        securityCode: cardSecurityCode,
        accountId: accountId,
        currentInvoice: 0,
        limit: 1000
      }

      await this.cardRepository.createCreditCard(newCreditCard)
      return res.status(201).json('Credit card created successfully')
    }
    catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  }

  async getAllCardsByAccount(req: Request, res: Response) {
    try {
      const { accountId } = req.body
      if (!accountId) return res.sendStatus(400)

      const cards = await this.cardRepository.getCardsByAccount(accountId)
      return res.status(200).json(cards)
    }
    catch (err) {
      return res.status(500).json(err)
    }
  }
}

const cardController = new CardController(cardRepository, accountRepository)
export { cardController }
