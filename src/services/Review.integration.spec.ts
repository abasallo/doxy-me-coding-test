import { initialiseTestDatabase } from '../modules/initialiseTestDatabase'

import { Review } from '../model/review.model'

import { AppOrm } from '../orm/model/appOrm'

import { addReview, findReview, getReview } from './Review'

const testModel: Promise<AppOrm> = initialiseTestDatabase()

const ids = [1, 2, 3]
const productIds = [2, 3, 3]
const userIds = [1, 2, 3]
const texts = ['review-text-1', 'review-text-2', 'review-text-3']

describe('Review Service', () => {
  describe('findReview', () => {
    test('Find the reviews matching the example', async () => {
      const find = await findReview(testModel)
      const reviews: Review[] = await find({ productId: 3 })
      expect(reviews.length).toEqual(2)
      expect(reviews[0].id).toEqual(2)
      expect(reviews[1].id).toEqual(3)
    })
  })

  describe('getReview', () => {
    for (const [index, id] of ids.entries()) {
      test(`Retrieved as expected for id: ${id}`, async () => {
        const get = await getReview(testModel)
        const review: Review = await get(id)
        expect(review.productId).toEqual(productIds[index])
        expect(review.userId).toEqual(userIds[index])
        expect(review.text).toEqual(texts[index])
      })
    }
  })

  test('addReview', async () => {
    const add = await addReview(testModel)
    const review: Review = await add({
      userId: 1,
      productId: 1,
      text: 'text'
    })
    expect(review.userId).toEqual(1)
    expect(review.productId).toEqual(1)
    expect(review.text).toEqual('text')
  })
})
