import { addUser, getUser, loginUser } from './User'
import { AppOrm } from '../orm/model/appOrm'
import { initialiseTestDatabase } from '../modules/initialiseTestDatabase'
import jwt from 'jsonwebtoken'
import { User } from '../model/user.model'

const TEST_TOKEN: string = jwt.sign(
  {
    username: 'username-1',
    date: Date.now()
  },
  'Secret',
  { expiresIn: '10m' }
)
const testModel: Promise<AppOrm> = initialiseTestDatabase()

describe('User Service', () => {
  test('getUser', async () => {
    const get = await getUser(testModel)
    const user: User = await get(TEST_TOKEN)
    expect(user.id).toEqual(1)
    expect(user.username).toEqual('username-1')
    expect(user.password).toEqual('hashed-password-1')
  })

  test('addUser', async () => {
    const add = await addUser(testModel)
    const newUser: User = await add({
      username: 'alvaro@basallo.es',
      password: 'password'
    })
    expect(newUser.username).toEqual('alvaro@basallo.es')
    expect(newUser.password).toBeDefined()
  })

  test('loginUser', async () => {
    const login = await loginUser(testModel)
    const token: string = await login({
      username: 'alvaro@basallo.es',
      password: 'password'
    })
    expect(token).toBeDefined()
  })
})
