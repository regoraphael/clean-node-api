import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

interface SutTypes {
  sut: CompareFieldsValidation
}

const makeSut = (): SutTypes => {
  const sut = new CompareFieldsValidation('password', 'passwordConfirmation')

  return { sut }
}

describe('CompareFields Validation', () => {
  test('Should return an error if validation fails', () => {
    const { sut } = makeSut()

    const body = {
      password: 'password',
      passwordConfirmation: 'other_password'
    }

    const error = sut.validate(body)

    expect(error).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('Should return null if validation pass', () => {
    const { sut } = makeSut()

    const body = {
      password: 'password',
      passwordConfirmation: 'password'
    }

    const error = sut.validate(body)

    expect(error).toBeFalsy()
  })
})
