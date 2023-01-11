import { CompareFieldsValidation } from '../../presentation/helpers/validator/compare-fields-validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validator/required-field-validation'
import { Validation } from '../../presentation/helpers/validator/validation'
import { ValidationComposite } from '../../presentation/helpers/validator/validation-composite'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validator/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()

    const requiredFieds = ['name', 'email', 'password', 'passwordConfirmation']

    const validators: Validation[] = requiredFieds.map(field => new RequiredFieldValidation(field))

    validators.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

    expect(ValidationComposite).toBeCalledWith(validators)
  })
})
