import { makeSignUpValidation } from './signup-validation'
import { EmailValidator } from '../../presentation/protocols'
import { Validation } from '../../presentation/helpers/validator/validation'
import { EmailValidation } from '../../presentation/helpers/validator/email-validation'
import { ValidationComposite } from '../../presentation/helpers/validator/validation-composite'
import { CompareFieldsValidation } from '../../presentation/helpers/validator/compare-fields-validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validator/required-field-validation'

jest.mock('../../presentation/helpers/validator/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()

    const requiredFieds = ['name', 'email', 'password', 'passwordConfirmation']

    const validators: Validation[] = requiredFieds.map(field => new RequiredFieldValidation(field))

    validators.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

    validators.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toBeCalledWith(validators)
  })
})
