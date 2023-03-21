import { initialiseTestDatabase } from '../modules/initialiseTestDatabase'

import { addProduct, deleteProduct, findProduct, getProduct, updateProduct } from './Product'

import { Product } from '../model/product.model'

import { AppOrm } from '../orm/model/appOrm'

const testModel: Promise<AppOrm> = initialiseTestDatabase()

const ids = [1, 2, 3]
const userIds = [2, 3, 3]
const descriptions = ['description-1', 'description-2', 'description-3']

describe('Product Service', () => {
  describe('findProduct', () => {
    test('Find the products matching the example', async () => {
      const find = await findProduct(testModel)
      const products: Product[] = await find({ userId: 3 })
      expect(products.length).toEqual(2)
      expect(products[0].id).toEqual(2)
      expect(products[1].id).toEqual(3)
    })
  })

  describe('getProduct', () => {
    for (const [index, id] of ids.entries()) {
      test(`Retrieved as expected for id: ${id}`, async () => {
        const get = await getProduct(testModel)
        const product: Product = await get(id)
        expect(product.userId).toEqual(userIds[index])
        expect(product.description).toEqual(descriptions[index])
      })
    }
  })

  test('addProduct', async () => {
    const add = await addProduct(testModel)
    const product: Product = await add({
      userId: 1,
      description: 'description'
    })
    expect(product.userId).toEqual(1)
    expect(product.description).toEqual('description')
  })

  test('updateProduct', async () => {
    const update = await updateProduct(testModel)
    const product: Product = await update({
      id: 1,
      userId: 2,
      description: 'updated-description'
    })
    expect(product.id).toEqual(1)
    expect(product.userId).toEqual(2)
    expect(product.description).toEqual('updated-description')
  })

  test('removeProduct', async () => {
    const destroy = await deleteProduct(testModel)
    const product: Product = await destroy({
      id: 1,
      userId: 2
    })
    expect(product.id).toEqual(1)
    expect(product.userId).toEqual(2)
    expect(product.description).toEqual('updated-description')
  })
})
