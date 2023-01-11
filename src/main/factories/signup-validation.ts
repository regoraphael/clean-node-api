import { ValidationComposite } from '../../presentation/helpers/validator/validation-composite'
import { RequiredFieldValidation } from '../../presentation/helpers/validator/required-field-validation'
import { CompareFieldsValidation } from '../../presentation/helpers/validator/compare-fields-validation'
import { Validation } from '../../presentation/helpers/validator/validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const requiredFieds = ['name', 'email', 'password', 'passwordConfirmation']

  const validators: Validation[] = requiredFieds.map(field => new RequiredFieldValidation(field))

  validators.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

  return new ValidationComposite(validators)
}
