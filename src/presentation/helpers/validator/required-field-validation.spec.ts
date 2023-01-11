import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

interface SutTypes {
  sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation('email')

  return { sut }
}

describe('RequiredField Validation', () => {
  test('Should return an error if validation fails', () => {
    const { sut } = makeSut()

    const body = {
      nome: 'any_name'
    }

    const error = sut.validate(body)

    expect(error).toEqual(new MissingParamError('email'))
  })

  test('Should return null if validation pass', () => {
    const { sut } = makeSut()

    const body = {
      email: 'email@mail.com'
    }

    const error = sut.validate(body)

    expect(error).toBeFalsy()
  })
})
