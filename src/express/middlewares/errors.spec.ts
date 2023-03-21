import { errorMiddleware, errorWrapper } from './errors'
import { Request, Response } from 'express'
import HttpStatus from 'http-status-codes'
import { Logger } from 'winston'

const err = {
  message: 'errorMessage',
  stack: ''
} as unknown as Error
const req = {} as Request
const res = {
  status: jest.fn(),
  send: jest.fn()
} as unknown as Response
const next = jest.fn()
const logger = {
  error: jest.fn()
} as unknown as Logger

describe('Error Middleware & Utils', () => {
  test('errorMiddleware', () => {
    const error = errorMiddleware(logger)
    error(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.send).toHaveBeenCalledWith('errorMessage')
    expect(logger.error).toHaveBeenCalledTimes(2)
    expect(next).toHaveBeenCalledWith(err)
  })

  test('errorWrapper', () => {
    const catchMock = jest.fn()
    const f = jest.fn(() => {
      return { catch: catchMock }
    })

    const req = {} as Request
    const res = {} as Response
    const next = jest.fn()

    errorWrapper(f)(req, res, next)

    expect(f).toHaveBeenCalledWith(req, res, next)
    expect(catchMock).toHaveBeenCalledWith(next)
  })
})
