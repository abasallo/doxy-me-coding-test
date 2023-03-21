import HttpStatus from 'http-status-codes'

import { Request, Response, Router } from 'express'

import { Product } from '../../model/product.model'
import { User } from '../../model/user.model'

import { errorWrapper } from '../middlewares/errors'

import { Container } from '../../container'
import { authMiddleware } from '../middlewares/auth'
import { getUserFromTokenIn } from './user'

const router = Router()

router.get(
  '/find',
  Container.Middlewares.bodyCache,
  errorWrapper(async (req: Request, res: Response) => {
    const product: Product = req.body
    const products: Product[] = await (await Container.ProductService.findProduct)(product)
    Container.cache.set(JSON.stringify(req.body), products)
    res.send(products)
  })
)

router.get(
  '/:id',
  Container.Middlewares.paramsCache,
  errorWrapper(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id)
    const product: Product = await (await Container.ProductService.getProduct)(id)
    if (!product) {
      res.status(HttpStatus.NOT_FOUND)
    }
    Container.cache.set(JSON.stringify(req.params), product)
    res.send(product)
  })
)

router.post(
  '/',
  authMiddleware,
  errorWrapper(async (req: Request, res: Response) => {
    const user: User = await getUserFromTokenIn(req)
    const description: string = req.body.description
    const product: Partial<Product> = {
      description,
      userId: user.id
    }
    const newProduct: Product = await (await Container.ProductService.addProduct)(product)
    if (!newProduct) {
      res.sendStatus(HttpStatus.BAD_REQUEST)
    }
    res.send(newProduct)
  })
)

router.put(
  '/',
  authMiddleware,
  errorWrapper(async (req: Request, res: Response) => {
    const user: User = await getUserFromTokenIn(req)
    const product: Product = req.body
    product.userId = user.id
    const updatedProduct: Product = await (await Container.ProductService.updateProduct)(product)
    if (!updatedProduct) {
      res.sendStatus(HttpStatus.BAD_REQUEST)
    }
    res.send(updatedProduct)
  })
)

router.delete(
  '/:id',
  authMiddleware,
  errorWrapper(async (req: Request, res: Response) => {
    const user: User = await getUserFromTokenIn(req)
    const id: number = parseInt(req.params.id)
    const product: Partial<Product> = {
      id,
      userId: user.id
    }
    const deletedProduct: Product = await (await Container.ProductService.deleteProduct)(product)
    if (!deletedProduct) {
      res.sendStatus(HttpStatus.BAD_REQUEST)
    }
    res.send(deletedProduct)
  })
)

export default router
