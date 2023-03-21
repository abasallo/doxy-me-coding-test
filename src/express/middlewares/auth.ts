import { Request, Response, NextFunction } from 'express'
import HttpStatus from 'http-status-codes'

import { isTokenValid } from '../../modules/jwt'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.headers.token as string
  if (!token || !isTokenValid(token)) {
    return res.sendStatus(HttpStatus.FORBIDDEN)
  }
  return next()
}
