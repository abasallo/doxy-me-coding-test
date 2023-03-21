import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

import { getUsernameFromToken, generateToken, isTokenValid, isPasswordValid, hashPassword } from './jwt'

describe('JWT Tests', () => {
  test('Extracts username from token', async () => {
    const properToken: string = jwt.sign(
      {
        username: 'username',
        date: Date.now()
      },
      'Secret',
      { expiresIn: '10m' }
    )
    const username: string = await getUsernameFromToken(properToken)
    expect(username).toEqual('username')
  })

  test('Generates token with default TTL properly', async () => expect(generateToken('user@host.tld')).toBeDefined())

  test('Checks token validity', async () => expect(isTokenValid(generateToken('user@host.tld'))).toBeTruthy())

  test('Compares provided password with hashed to check if is the same and it is', async () =>
    expect(isPasswordValid('password', await bcrypt.hash('password', 10))).resolves.toBeTruthy())

  test('Compares provided password with hashed to check if is the same and it is not', async () =>
    expect(isPasswordValid('wrongPassword', await bcrypt.hash('password', 10))).resolves.toBeFalsy())

  test('Hashes provided password', async () => expect(isPasswordValid('password', await hashPassword('password'))).toBeTruthy())
})
