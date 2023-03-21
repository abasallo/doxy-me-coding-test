import { Sequelize } from 'sequelize'

import { initializeModel } from './initialiseModel'

import { AppOrm } from './model/appOrm'
import { Logger } from 'winston'

export const initialiseSequelize = (logger: Logger = undefined) => {
  return async (CONNECTION_URL: string): Promise<AppOrm> => {
    const sequelize: Sequelize = new Sequelize(CONNECTION_URL, {
      logging: logger ? (msg) => logger.debug(msg) : undefined
    })
    const model = initializeModel(sequelize)
    model.Product.belongsTo(model.User)
    model.User.hasMany(model.Product)
    model.Review.belongsTo(model.User)
    model.User.hasMany(model.Review)
    model.Review.belongsTo(model.Product)
    model.Product.hasMany(model.Review)
    await sequelize.sync()
    return model
  }
}
