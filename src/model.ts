import { AppOrm } from './orm/model/appOrm'
import { initialiseTestDatabase } from './modules/initialiseTestDatabase'
import { Container } from './container'

export const model: Promise<AppOrm> = process.env.CONNECTION_URL ? Container.ORM.init(process.env.CONNECTION_URL) : initialiseTestDatabase()
