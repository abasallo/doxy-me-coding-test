import jwt from 'jsonwebtoken'

import bcrypt from 'bcryptjs'

export const getUsernameFromToken = async (token: string): Promise<string> => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (await jwt.verify(token, process.env.JWT_SECRET || 'Secret')).username
  } catch (error) {
    return undefined
  }
}

export const generateToken = (username: string): string =>
  jwt.sign({ username, date: Date.now() }, process.env.JWT_SECRET || 'Secret', { expiresIn: process.env.TOKEN_TTL || '1d' })

export const isTokenValid = (token: string): boolean => {
  try {
    const secret: string = process.env.JWT_SECRET || 'Secret'
    const payload = jwt.verify(token, secret)
    return !!payload
  } catch (e) {
    return false
  }
}

export const isPasswordValid = async (plainPassword: string, hashedPassword: string): Promise<boolean> =>
  await bcrypt.compare(plainPassword, hashedPassword)

export const hashPassword = async (password: string): Promise<string> =>
  await bcrypt.hash(password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS) || 10)
