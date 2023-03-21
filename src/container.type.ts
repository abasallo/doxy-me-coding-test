import { Product } from './model/product.model'
import { Review } from './model/review.model'
import { User } from './model/user.model'
import { NextFunction, Request, Response } from 'express'
import { AppOrm } from './orm/model/appOrm'
import NodeCache from 'node-cache'

export interface ContainerType {
  cache: NodeCache
  ORM: {
    init: (CONNECTION_URL: string) => Promise<AppOrm>
  }
  Middlewares: {
    paramsCache: (req: Request, res: Response, next: NextFunction) => void
    bodyCache: (req: Request, res: Response, next: NextFunction) => void
    error: (err: Error, req: Request, res: Response, next: NextFunction) => void
    log: (req: Request, res: Response, next: NextFunction) => void
  }
  ProductService: {
    findProduct: Promise<(product: Partial<Product>) => Promise<Product[]>>
    getProduct: Promise<(id: number) => Promise<Product>>
    addProduct: Promise<(product: Partial<Product>) => Promise<Product>>
    updateProduct: Promise<(product: Product) => Promise<Product>>
    deleteProduct: Promise<(product: Partial<Product>) => Promise<Product>>
  }
  ReviewService: {
    findReview: Promise<(review: Partial<Review>) => Promise<Review[]>>
    getReview: Promise<(id: number) => Promise<Review>>
    addReview: Promise<(review: Partial<Review>) => Promise<Review>>
  }
  UserService: {
    getUserFromToken: Promise<(token: string) => Promise<User>>
    addUser: Promise<(user: Partial<User>) => Promise<User>>
    loginUser: Promise<(user: Partial<User>) => Promise<string>>
  }
}
