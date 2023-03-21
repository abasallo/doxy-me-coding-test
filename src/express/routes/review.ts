import HttpStatus from 'http-status-codes'

import { Request, Response, Router } from 'express'

import { Review } from '../../model/review.model'

import { errorWrapper } from '../middlewares/errors'
import { Container } from '../../container'
import { User } from '../../model/user.model'
import { authMiddleware } from '../middlewares/auth'
import { getUserFromTokenIn } from './user'

const router = Router()

router.get(
  '/find',
  authMiddleware,
  Container.Middlewares.bodyCache,
  errorWrapper(async (req: Request, res: Response) => {
    const review: Review = req.body
    const reviews: Review[] = await (await Container.ReviewService.findReview)(review)
    Container.cache.set(JSON.stringify(req.body), reviews)
    res.send(reviews)
  })
)

router.get(
  '/:id',
  authMiddleware,
  Container.Middlewares.paramsCache,
  errorWrapper(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id)
    const review: Review = await (await Container.ReviewService.getReview)(id)
    if (!review) {
      res.status(HttpStatus.NOT_FOUND)
    }
    Container.cache.set(JSON.stringify(req.params), review)
    res.send(review)
  })
)

router.post(
  '/',
  authMiddleware,
  errorWrapper(async (req: Request, res: Response) => {
    const user: User = await getUserFromTokenIn(req)
    const review: Review = req.body
    review.userId = user.id
    const newReview: Review = await (await Container.ReviewService.addReview)(review)
    if (!newReview) {
      res.sendStatus(HttpStatus.BAD_REQUEST)
    }
    res.send(newReview)
  })
)

export default router
