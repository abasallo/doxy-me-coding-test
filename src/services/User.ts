import { User } from '../model/user.model'

import { AppOrm } from '../orm/model/appOrm'
import { generateToken, getUsernameFromToken, hashPassword, isPasswordValid } from '../modules/jwt'

export const getUser = async (model: Promise<AppOrm>): Promise<(token: string) => Promise<User>> => {
  const appOrmModel: AppOrm = await model
  return async (token: string): Promise<User> => {
    const username: string = await getUsernameFromToken(token)
    return await appOrmModel.User.findOne({ where: { username } })
  }
}

export const addUser = async (model: Promise<AppOrm>): Promise<(user: Partial<User>) => Promise<User>> => {
  const appOrmModel: AppOrm = await model
  return async (user: Partial<User>): Promise<User> => {
    user.password = await hashPassword(user.password)
    const newUser: User = await appOrmModel.User.create(user)
    if (!newUser) {
      throw new Error(`Could not create user: ${JSON.stringify(user)}.`)
    }
    return newUser
  }
}

export const loginUser = async (model: Promise<AppOrm>): Promise<(user: Partial<User>) => Promise<string>> => {
  const appOrmModel: AppOrm = await model
  return async (user: Partial<User>): Promise<string> => {
    const retrievedUser: User = await appOrmModel.User.findOne({ where: { username: user.username } })
    const isPasswordCorrect: boolean = await isPasswordValid(user.password, retrievedUser.password)
    if (!isPasswordCorrect) {
      throw new Error(`Cound not log User with username: ${user.username}.`)
    }
    return generateToken(user.username)
  }
}
