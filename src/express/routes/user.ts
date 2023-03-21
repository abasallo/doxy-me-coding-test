import HttpStatus from 'http-status-codes'

import { Request, Response, Router } from 'express'

import { User } from '../../model/user.model'

import { errorWrapper } from '../middlewares/errors'

import { Container } from '../../container'

const router = Router()

export const getUserFromTokenIn = async (req: Request): Promise<User> => {
  const token: string = req.headers.token as string
  return (await Container.UserService.getUserFromToken)(token)
}

router.post(
  '/sign-up',
  errorWrapper(async (req: Request, res: Response) => {
    const user: User = req.body
    const newUser: User = await (await Container.UserService.addUser)(user)
    if (!newUser) {
      res.sendStatus(HttpStatus.BAD_REQUEST)
    }
    newUser.password = undefined
    res.send(newUser)
  })
)

router.post(
  '/sign-in',
  errorWrapper(async (req: Request, res: Response) => {
    const user: User = req.body
    const token: string = await (await Container.UserService.loginUser)(user)
    if (!token) {
      res.sendStatus(HttpStatus.BAD_REQUEST)
    }
    res.send({ token })
  })
)

export default router
