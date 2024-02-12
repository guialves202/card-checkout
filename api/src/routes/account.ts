import { Router } from 'express'
import { accountController } from '../controllers/AccountController'

const router = Router()

router.get('/accounts', accountController.getAllAccounts.bind(accountController))

router.post('/account/create', accountController.create.bind(accountController))

export default router
