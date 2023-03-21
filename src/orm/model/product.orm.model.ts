import { Model, Optional } from 'sequelize'

import { Product } from '../../model/product.model'

type ProductCreation = Optional<Product, 'id'>

export interface ProductOrm extends Model<Product, ProductCreation>, Product {}
