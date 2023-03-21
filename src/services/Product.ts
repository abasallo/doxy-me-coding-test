import { Product } from '../model/product.model'

import { AppOrm } from '../orm/model/appOrm'

export const findProduct = async (model: Promise<AppOrm>): Promise<(product: Partial<Product>) => Promise<Product[]>> => {
  const appOrmModel: AppOrm = await model
  return async (product: Partial<Product>): Promise<Product[]> => await appOrmModel.Product.findAll({ where: product })
}

export const getProduct = async (model: Promise<AppOrm>): Promise<(id: number) => Promise<Product>> => {
  const appOrmModel: AppOrm = await model
  return async (id: number): Promise<Product> => {
    const product: Product = await appOrmModel.Product.findByPk(id)
    if (!product) {
      throw new Error(`Cannot find a Product with id: ${id}.`)
    }
    return product
  }
}

export const addProduct = async (model: Promise<AppOrm>): Promise<(product: Partial<Product>) => Promise<Product>> => {
  const appOrmModel: AppOrm = await model
  return async (product: Partial<Product>): Promise<Product> => {
    const newProduct: Product = await appOrmModel.Product.create(product)
    if (!newProduct) {
      throw new Error(`Could not create product: ${JSON.stringify(product)}.`)
    }
    return newProduct
  }
}

export const updateProduct = async (model: Promise<AppOrm>): Promise<(product: Product) => Promise<Product>> => {
  const appOrmModel: AppOrm = await model
  return async (product: Product): Promise<Product> => {
    const fetchedProduct = await appOrmModel.Product.findOne({ where: { id: product.id, userId: product.userId } })
    if (!fetchedProduct) {
      throw new Error(`Could not update product: ${JSON.stringify(product)}.`)
    }
    fetchedProduct.description = product.description
    await fetchedProduct.save()
    return fetchedProduct
  }
}
export const deleteProduct = async (model: Promise<AppOrm>): Promise<(product: Partial<Product>) => Promise<Product>> => {
  const appOrmModel: AppOrm = await model
  return async (product: Partial<Product>): Promise<Product> => {
    const fetchedProduct = await appOrmModel.Product.findOne({ where: { id: product.id, userId: product.userId } })
    if (!fetchedProduct) {
      throw new Error(`Could not delete product: ${product.id}.`)
    }
    await fetchedProduct.destroy()
    return fetchedProduct
  }
}
