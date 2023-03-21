import { Review } from '../model/review.model'
import { Product } from '../model/product.model'

import { AppOrm } from '../orm/model/appOrm'

export const findReview = async (model: Promise<AppOrm>): Promise<(review: Partial<Review>) => Promise<Review[]>> => {
  const appOrmModel: AppOrm = await model
  return async (review: Partial<Review>): Promise<Review[]> => await appOrmModel.Review.findAll({ where: review })
}

export const getReview = async (model: Promise<AppOrm>): Promise<(id: number) => Promise<Review>> => {
  const appOrmModel: AppOrm = await model
  return async (id: number): Promise<Review> => {
    const review: Review = await appOrmModel.Review.findByPk(id)
    if (!review) {
      throw new Error(`Cannot find a Review with id: ${id}.`)
    }
    return review
  }
}

export const addReview = async (model: Promise<AppOrm>): Promise<(review: Partial<Review>) => Promise<Review>> => {
  const appOrmModel: AppOrm = await model
  return async (review: Partial<Review>): Promise<Review> => {
    const product: Product = await appOrmModel.Product.findByPk(review.productId)
    if (!product) {
      throw new Error(`Could not find product with id: ${review.productId}.`)
    }
    review.productId = product.id
    const newReview: Review = await appOrmModel.Review.create(review)
    if (!newReview) {
      throw new Error(`Could not create product: ${JSON.stringify(product)}.`)
    }
    return newReview
  }
}
