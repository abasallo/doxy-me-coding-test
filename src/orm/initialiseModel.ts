import { DataTypes, Sequelize } from 'sequelize'
import { ModelStatic } from 'sequelize/types/model'

import { ProductOrm } from './model/product.orm.model'
import { ReviewOrm } from './model/review.orm.model'
import { UserOrm } from './model/user.orm.model'

import { AppOrm } from './model/appOrm'

const initialiseProduct = (sequelize: Sequelize): ModelStatic<ProductOrm> => {
  return sequelize.define<ProductOrm>(
    'product',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { allowNull: true, type: DataTypes.UUID },
      description: { type: DataTypes.STRING }
    },
    {
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['id']
        },
        {
          fields: ['userId']
        }
      ]
    }
  )
}

const initialiseReview = (sequelize: Sequelize): ModelStatic<ReviewOrm> => {
  return sequelize.define<ReviewOrm>(
    'review',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      productId: { allowNull: true, type: DataTypes.UUID },
      userId: { allowNull: true, type: DataTypes.UUID },
      text: { type: DataTypes.STRING }
    },
    { timestamps: false }
  )
}

const initialiseUser = (sequelize: Sequelize): ModelStatic<UserOrm> => {
  return sequelize.define<UserOrm>(
    'user',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING }
    },
    { timestamps: false }
  )
}

export const initializeModel = (sequelize: Sequelize): AppOrm => ({
  Product: initialiseProduct(sequelize),
  Review: initialiseReview(sequelize),
  User: initialiseUser(sequelize)
})
