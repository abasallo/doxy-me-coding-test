import { Request, Response, NextFunction } from 'express'
import HttpStatus from 'http-status-codes'
import { Logger } from 'winston'

export const errorMiddleware = (logger: Logger) => {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    const errorMessage: string = err.message
    const errorStack: string = JSON.stringify(err.stack)
    logger.error(`ErrorMessage: ${errorMessage}`)
    logger.error(`ErrorStack: ${errorStack}`)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR)
    res.send(errorMessage)
    next(err)
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function errorWrapper(f: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    f(req, res, next).catch(next)
  }
}
