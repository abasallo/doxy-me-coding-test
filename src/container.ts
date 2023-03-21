import { model } from './model'
import winston from 'winston'

import { getProduct, addProduct, updateProduct, deleteProduct, findProduct } from './services/Product'
import { addReview, findReview, getReview } from './services/Review'
import { getUser, addUser, loginUser } from './services/User'

import { ContainerType } from './container.type'

import { errorMiddleware } from './express/middlewares/errors'
import { paramsCacheMiddleware, bodyCacheMiddleware } from './express/middlewares/cache'
import { logMiddleware } from './express/middlewares/log'

import { initialiseSequelize } from './orm/initialiseSequelize'
import NodeCache from 'node-cache'

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

const cache = new NodeCache({ stdTTL: parseInt(process.env.ORM_CACHE_TTL) || 60 })

export const Container: ContainerType = {
  cache,
  ORM: {
    init: initialiseSequelize(logger)
  },
  Middlewares: {
    paramsCache: paramsCacheMiddleware(logger, cache),
    bodyCache: bodyCacheMiddleware(logger, cache),
    error: errorMiddleware(logger),
    log: logMiddleware(logger)
  },
  ProductService: {
    findProduct: findProduct(model),
    getProduct: getProduct(model),
    addProduct: addProduct(model),
    updateProduct: updateProduct(model),
    deleteProduct: deleteProduct(model)
  },
  ReviewService: {
    findReview: findReview(model),
    addReview: addReview(model),
    getReview: getReview(model)
  },
  UserService: {
    getUserFromToken: getUser(model),
    addUser: addUser(model),
    loginUser: loginUser(model)
  }
}
