import { MissingParamError } from '../../errors'
import { ValidationComposite } from './validation-composite'
import { RequiredFieldValidation } from './required-field-validation'

interface SutTypes {
  sut: ValidationComposite
  requiredFieldValidationStub: RequiredFieldValidation
}

const makeRequiredFieldValidation = (): RequiredFieldValidation => {
  class RequiredFieldValidationStub extends RequiredFieldValidation {
    validate (input: any): Error {
      return null
    }
  }

  return new RequiredFieldValidationStub('email')
}

const makeSut = (): SutTypes => {
  const requiredFieldValidationStub = makeRequiredFieldValidation()
  const sut = new ValidationComposite([
    requiredFieldValidationStub
  ])

  return { sut, requiredFieldValidationStub }
}

describe('RequiredField Validation', () => {
  test('Should return an error if some validation returns an error', () => {
    const { sut, requiredFieldValidationStub } = makeSut()

    const fakeError = new MissingParamError('email')

    jest.spyOn(requiredFieldValidationStub, 'validate').mockReturnValueOnce(fakeError)

    const body = {
      nome: 'any_name'
    }

    const error = sut.validate(body)

    expect(error).toEqual(fakeError)
  })

  test('Should return null if all validations returns null', () => {
    const { sut } = makeSut()

    const body = {
      email: 'email@mail.com'
    }

    const error = sut.validate(body)

    expect(error).toBeFalsy()
  })
})
