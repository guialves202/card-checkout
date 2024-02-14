import { Router } from 'express'
import { accountController } from '../controllers/AccountController'

const router = Router()

router.get('/accounts', accountController.getAllAccounts.bind(accountController))

router.post('/accounts/account/getbyid', accountController.getOneAccountById.bind(accountController))
router.post('/account/create', accountController.create.bind(accountController))
router.post('/account/signin', accountController.signin.bind(accountController))
router.post('/account/deposit', accountController.depositMoneyIntoAccount.bind(accountController))
router.post('/account/payment/debitcard', accountController.makePaymentWithDebitCard.bind(accountController))

export default router
