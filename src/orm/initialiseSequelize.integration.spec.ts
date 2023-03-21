import { initialiseTestDatabase } from '../modules/initialiseTestDatabase'

import { Product } from '../model/product.model'
import { Review } from '../model/review.model'
import { User } from '../model/user.model'
import { AppOrm } from './model/appOrm'

let testModel: AppOrm

beforeAll(async () => (testModel = await initialiseTestDatabase()))

describe('ORM Integration Test', () => {
  test('ORM is initialised', async () => {
    expect(testModel.Product).toBeDefined()
    expect(testModel.Review).toBeDefined()
    expect(testModel.User).toBeDefined()
  })

  test('Product finders work as expected', async () => {
    const product: Product = await testModel.Product.findByPk(1)
    expect(product.id).toEqual(1)
    expect(product.userId).toEqual(2)
    expect(product.description).toEqual('description-1')
  })

  test('Review finders work as expected', async () => {
    const review: Review = await testModel.Review.findByPk(1)
    expect(review.id).toEqual(1)
    expect(review.productId).toEqual(2)
    expect(review.userId).toEqual(1)
    expect(review.text).toEqual('review-text-1')
  })

  test('User finders work as expected', async () => {
    const user: User = await testModel.User.findByPk(1)
    expect(user.id).toEqual(1)
    expect(user.username).toEqual('username-1')
    expect(user.password).toEqual('hashed-password-1')
  })
})
