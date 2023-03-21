import { initialiseTestDatabase } from './initialiseTestDatabase'
import { AppOrm } from '../orm/model/appOrm'

let testModel: AppOrm

beforeAll(async () => (testModel = await initialiseTestDatabase()))

describe('initialiseTestDatabase', () => {
  test('DB should be properly initialized', async () => {
    expect(testModel).toBeDefined()
    expect(await testModel.User.count()).toEqual(3)
    expect(await testModel.Product.count()).toEqual(3)
    expect(await testModel.Review.count()).toEqual(3)
  })
})
