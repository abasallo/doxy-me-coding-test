import { initialiseSequelize } from '../orm/initialiseSequelize'
import { AppOrm } from '../orm/model/appOrm'

const TEST_CONNECTION_URL = 'sqlite://doxy-me-coding-test.sqlite'

let testModel: AppOrm

const destroyTestDatabase = (): Promise<[number, number, number]> =>
  Promise.all([
    testModel.Product.destroy({ truncate: true }),
    testModel.Review.destroy({ truncate: true }),
    testModel.User.destroy({ truncate: true })
  ])

export const initialiseTestDatabase = async (): Promise<AppOrm> => {
  testModel = await initialiseSequelize()(TEST_CONNECTION_URL)

  await destroyTestDatabase()

  await Promise.all([
    testModel.User.create({ id: 1, username: 'username-1', password: 'hashed-password-1' }),
    testModel.User.create({ id: 2, username: 'username-2', password: 'hashed-password-2' }),
    testModel.User.create({ id: 3, username: 'username-3', password: 'hashed-password-3' }),

    testModel.Product.create({ id: 1, userId: 2, description: 'description-1' }),
    testModel.Product.create({ id: 2, userId: 3, description: 'description-2' }),
    testModel.Product.create({ id: 3, userId: 3, description: 'description-3' }),

    testModel.Review.create({ id: 1, productId: 2, userId: 1, text: 'review-text-1' }),
    testModel.Review.create({ id: 2, productId: 3, userId: 2, text: 'review-text-2' }),
    testModel.Review.create({ id: 3, productId: 3, userId: 3, text: 'review-text-3' })
  ])

  return testModel
}
