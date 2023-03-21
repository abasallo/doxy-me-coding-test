import { Request, Response } from 'express'
import HttpStatus from 'http-status-codes'
import { paramsCacheMiddleware, bodyCacheMiddleware } from './cache'
import { Logger } from 'winston'
import NodeCache from 'node-cache'

afterEach(() => jest.clearAllMocks())

const cache = new NodeCache()

const req = {
  params: { test: 'test' },
  body: { test: 'test' }
} as unknown as Request

const status = jest.fn()
const res = {
  status: jest.fn(),
  send: jest.fn(() => ({ status }))
} as unknown as Response

const next = jest.fn()

const logger = {
  info: jest.fn()
} as unknown as Logger

describe('Cache Middleware', () => {
  test('paramsCacheMiddleware', () => {
    const cacheWithLogger = paramsCacheMiddleware(logger, cache)
    cacheWithLogger(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.send).not.toHaveBeenCalled()

    cache.set(JSON.stringify(req.params), 'data')
    cacheWithLogger(req, res, next)

    expect(res.send).toHaveBeenCalledWith('data')
    expect(status).toHaveBeenCalledWith(HttpStatus.OK)

    cache.del(JSON.stringify(req.params))
  })

  test('bodyCacheMiddleware', () => {
    const cacheWithLogger = bodyCacheMiddleware(logger, cache)
    cacheWithLogger(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.send).not.toHaveBeenCalled()

    cache.set(JSON.stringify(req.body), 'data')
    cacheWithLogger(req, res, next)

    expect(res.send).toHaveBeenCalledWith('data')
    expect(status).toHaveBeenCalledWith(HttpStatus.OK)

    cache.del(JSON.stringify(req.body))
  })
})
