import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

interface SutTypes {
  sut: BcryptAdapter
  salt: number
}

const makeSut = (): SutTypes => {
  const salt = 12
  const sut = new BcryptAdapter(salt)

  return { sut, salt }
}

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hashed_value'))
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const { sut, salt } = makeSut()

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')

    expect(hashSpy).toBeCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const { sut } = makeSut()

    const value = await sut.encrypt('any_value')

    expect(value).toBe('hashed_value')
  })

  test('Should throw if bcrypt throw', async () => {
    const { sut } = makeSut()

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })

    const promise = sut.encrypt('any_value')

    await expect(promise).rejects.toThrow()
  })
})
