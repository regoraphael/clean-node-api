import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

interface SutTypes {
  sut: AccountMongoRepository
}

const makeSut = (): SutTypes => {
  const sut = new AccountMongoRepository()

  return { sut }
}

describe('Account Mongo Repository', () => {
  const mongoHelper = MongoHelper.getInstance()

  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await mongoHelper.getCollection('accounts')

    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('valid_name')
    expect(account.email).toBe('valid_email@mail.com')
    expect(account.password).toBe('hashed_password')
  })
})
