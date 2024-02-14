import express from 'express'
import cors from 'cors'

import accountRoutes from './routes/account'
import cardRoutes from './routes/card'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.use(accountRoutes)
app.use(cardRoutes)

export { app }
