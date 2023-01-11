import { ValidationComposite } from '../../presentation/helpers/validator/validation-composite'
import { RequiredFieldValidation } from '../../presentation/helpers/validator/required-field-validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const requiredFieds = ['name', 'email', 'password', 'passwordConfirmation']

  const validators = requiredFieds.map(field => new RequiredFieldValidation(field))

  return new ValidationComposite(validators)
}
