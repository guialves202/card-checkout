import { Router } from 'express'
import { cardController } from '../controllers/CardController'

const router = Router()

router.post('/cards', cardController.getAllCardsByAccount.bind(cardController))
router.post('/cards/debit/create', cardController.createDebitCard.bind(cardController))
router.post('/cards/credit/create', cardController.createCreditCard.bind(cardController))

export default router
