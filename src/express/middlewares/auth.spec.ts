import { Request, Response } from 'express'
import HttpStatus from 'http-status-codes'
import { authMiddleware } from './auth'

jest.mock('../../modules/jwt', () => ({ isTokenValid: () => true }))

const req = { headers: { token: 'token' } } as unknown as Request
const res = { sendStatus: jest.fn() } as unknown as Response

const next = jest.fn()

afterEach(() => jest.clearAllMocks())

describe('Authentication Middleware', () => {
  describe('authMiddleware', () => {
    test('On right token authentication success', () => {
      authMiddleware(req, res, next)
      expect(next).toHaveBeenCalled()
      expect(res.sendStatus).not.toHaveBeenCalled()
    })

    test('On absent token authentication fails', () => {
      req.headers.token = undefined
      authMiddleware(req, res, next)
      expect(next).not.toHaveBeenCalled()
      expect(res.sendStatus).toHaveBeenCalledWith(HttpStatus.FORBIDDEN)
    })

    test('On empty token authentication fails', () => {
      req.headers.token = ''
      authMiddleware(req, res, next)
      expect(next).not.toHaveBeenCalled()
      expect(res.sendStatus).toHaveBeenCalledWith(HttpStatus.FORBIDDEN)
    })

    test('On wrong token authentication fails', () => {
      jest.mock('../../modules/jwt', () => ({ isTokenValid: () => false }))
      authMiddleware(req, res, next)
      expect(next).not.toHaveBeenCalled()
      expect(res.sendStatus).toHaveBeenCalledWith(HttpStatus.FORBIDDEN)
    })
  })
})
