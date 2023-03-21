import HttpStatus from 'http-status-codes'

import { Request, Response, Router } from 'express'
import { errorWrapper } from '../middlewares/errors'

const router = Router()

router.get(
  '/',
  errorWrapper(async (req: Request, res: Response) => res.status(HttpStatus.OK).send('OK'))
)

export default router
