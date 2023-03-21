import { Request, Response, NextFunction } from 'express'
import { Logger } from 'winston'

export const logMiddleware = (logger: Logger) => {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.info(req)
    logger.info(res)
    return next()
  }
}
