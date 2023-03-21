import { Request, Response, NextFunction } from 'express'
import HttpStatus from 'http-status-codes'
import { Logger } from 'winston'
import NodeCache from 'node-cache'

const cacheMiddleware = (logger: Logger, cache: NodeCache, key: string, res: Response, next: NextFunction) => {
  try {
    if (cache.has(key)) {
      const cacheContents: string = cache.get(key)
      logger.info(`Cache hit - key: ${key} - cacheContents: ${cacheContents}`)
      return res.send(cacheContents).status(HttpStatus.OK)
    }
    return next()
  } catch (err) {
    logger.info(err)
    throw err
  }
}
export const paramsCacheMiddleware = (logger: Logger, cache: NodeCache) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key: string = JSON.stringify(req.params)
    cacheMiddleware(logger, cache, key, res, next)
  }
}

export const bodyCacheMiddleware = (logger: Logger, cache: NodeCache) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key: string = JSON.stringify(req.body)
    cacheMiddleware(logger, cache, key, res, next)
  }
}
