import { ModelStatic } from 'sequelize/types/model'

import { ProductOrm } from './product.orm.model'
import { ReviewOrm } from './review.orm.model'
import { UserOrm } from './user.orm.model'

export interface AppOrm {
  Product: ModelStatic<ProductOrm>
  Review: ModelStatic<ReviewOrm>
  User: ModelStatic<UserOrm>
}
