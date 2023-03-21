import axios from 'axios'

import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import app from '../src/app'

import http from 'http'

const TEST_SERVER_PORT = 4001

let server: http.Server

let token: string

beforeAll(async () => {
  server = await app.listen({ port: TEST_SERVER_PORT }, () => console.log(`Test Server initialised on port: ${TEST_SERVER_PORT}`))
})

afterAll(() => {
  server.close()
})

describe('Server E2E tests', () => {
  describe('User E2E tests', () => {
    test('Sign up', async () => {
      const { status, statusText, data } = await axios({
        method: 'post',
        url: `http://localhost:${TEST_SERVER_PORT}/user/sign-up/`,
        data: {
          username: 'username-test',
          password: 'password-test'
        }
      })

      expect(status).toEqual(StatusCodes.OK)
      expect(statusText).toEqual(ReasonPhrases.OK)

      expect(data).toMatchSnapshot({
        id: expect.any(Number)
      })
    })

    test('Sign in', async () => {
      const { status, statusText, data } = await axios({
        method: 'post',
        url: `http://localhost:${TEST_SERVER_PORT}/user/sign-in/`,
        data: {
          username: 'username-test',
          password: 'password-test'
        }
      })

      expect(status).toEqual(StatusCodes.OK)
      expect(statusText).toEqual(ReasonPhrases.OK)

      token = data.token

      expect(data).toMatchSnapshot({
        token: expect.any(String)
      })
    })
  })

  describe('Product E2E tests', () => {
    let newProductId: string

    test('Add Product', async () => {
      const { status, statusText, data } = await axios({
        method: 'post',
        url: `http://localhost:${TEST_SERVER_PORT}/product/`,
        data: {
          description: 'new-description'
        },
        headers: { token }
      })

      expect(status).toEqual(StatusCodes.OK)
      expect(statusText).toEqual(ReasonPhrases.OK)

      newProductId = data.id

      expect(data).toMatchSnapshot({
        id: expect.any(Number),
        userId: expect.any(Number)
      })
    })

    test('Find Products', async () => {
      const { status, statusText, data } = await axios({
        method: 'get',
        url: `http://localhost:${TEST_SERVER_PORT}/product/find`,
        data: {
          userId: 3
        }
      })

      expect(status).toEqual(StatusCodes.OK)
      expect(statusText).toEqual(ReasonPhrases.OK)

      expect(data).toMatchSnapshot()
    })

    test('Get Product', async () => {
      const { status, statusText, data } = await axios({
        method: 'get',
        url: `http://localhost:${TEST_SERVER_PORT}/product/${newProductId}`
      })

      expect(status).toEqual(StatusCodes.OK)
      expect(statusText).toEqual(ReasonPhrases.OK)

      expect(data).toMatchSnapshot({
        id: expect.any(Number),
        userId: expect.any(Number)
      })
    })

    test('Update Product', async () => {
      const { status, statusText, data } = await axios({
        method: 'put',
        url: `http://localhost:${TEST_SERVER_PORT}/product/`,
        data: {
          id: newProductId,
          description: 'updated-description'
        },
        headers: { token }
      })

      expect(status).toEqual(StatusCodes.OK)
      expect(statusText).toEqual(ReasonPhrases.OK)

      expect(data).toMatchSnapshot({
        id: expect.any(Number),
        userId: expect.any(Number)
      })
    })

    test('Delete Product', async () => {
      const { status, statusText, data } = await axios({
        method: 'delete',
        url: `http://localhost:${TEST_SERVER_PORT}/product/${newProductId}`,
        headers: { token }
      })

      expect(status).toEqual(StatusCodes.OK)
      expect(statusText).toEqual(ReasonPhrases.OK)

      expect(data).toMatchSnapshot({
        id: expect.any(Number),
        userId: expect.any(Number)
      })
    })
  })

  describe('Review E2E tests', () => {
    test('Find Reviews', async () => {
      const { status, statusText, data } = await axios({
        method: 'get',
        url: `http://localhost:${TEST_SERVER_PORT}/review/find`,
        headers: { token },
        data: {
          productId: 3
        }
      })

      expect(status).toEqual(StatusCodes.OK)
      expect(statusText).toEqual(ReasonPhrases.OK)

      expect(data).toMatchSnapshot()
    })

    test('Get Review', async () => {
      const { status, statusText, data } = await axios({
        method: 'get',
        url: `http://localhost:${TEST_SERVER_PORT}/review/1`,
        headers: { token }
      })

      expect(status).toEqual(StatusCodes.OK)
      expect(statusText).toEqual(ReasonPhrases.OK)

      expect(data).toMatchSnapshot({
        id: expect.any(Number),
        productId: expect.any(Number),
        userId: expect.any(Number)
      })
    })

    test('Add Review', async () => {
      const { status, statusText, data } = await axios({
        method: 'post',
        url: `http://localhost:${TEST_SERVER_PORT}/review/`,
        data: {
          productId: 1,
          text: 'Review Text'
        },
        headers: { token }
      })

      expect(status).toEqual(StatusCodes.OK)
      expect(statusText).toEqual(ReasonPhrases.OK)

      expect(data).toMatchSnapshot({
        id: expect.any(Number),
        productId: expect.any(Number),
        userId: expect.any(Number)
      })
    })
  })

  describe('Health Check E2E tests', () => {
    test('Expected response for Health Check', async () => {
      const { status, statusText, data } = await axios({
        method: 'get',
        url: `http://localhost:${TEST_SERVER_PORT}/`
      })

      expect(status).toEqual(StatusCodes.OK)
      expect(statusText).toEqual(ReasonPhrases.OK)

      expect(data).toMatchSnapshot()
    })
  })
})
