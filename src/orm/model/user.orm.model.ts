import { Model, Optional } from 'sequelize'

import { User } from '../../model/user.model'

type UserCreation = Optional<User, 'id'>

export interface UserOrm extends Model<User, UserCreation>, User {}
