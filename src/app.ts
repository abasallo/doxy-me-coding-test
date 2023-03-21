import * as dotenv from 'dotenv'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import index from './express/routes'
import user from './express/routes/user'
import product from './express/routes/product'
import review from './express/routes/review'

import { Container } from './container'

dotenv.config()

export const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', index)
app.use('/user', user)
app.use('/product', product)
app.use('/review', review)

app.use(Container.Middlewares.error)
app.use(Container.Middlewares.log)

export default app
