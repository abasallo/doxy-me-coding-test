import { Model, Optional } from 'sequelize'

import { Review } from '../../model/review.model'

type ReviewCreation = Optional<Review, 'id'>

export interface ReviewOrm extends Model<Review, ReviewCreation>, Review {}
