import { Request, Response } from 'express'
import { Logger } from 'winston'

import { logMiddleware } from './log'

const req = {} as unknown as Request
const res = {} as unknown as Response
const next = jest.fn()

const logger = {
  info: jest.fn()
} as unknown as Logger

describe('Logging Middleware', () => {
  test('logMiddleware', () => {
    const log = logMiddleware(logger)
    log(req, res, next)
    expect(logger.info).toHaveBeenCalledTimes(2)
    expect(next).toHaveBeenCalled()
  })
})
