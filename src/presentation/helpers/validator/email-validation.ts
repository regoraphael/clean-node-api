import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols'
import { Validation } from './validation'

export class EmailValidation implements Validation {
  private readonly fieldName: string
  private readonly emailValidator: EmailValidator

  constructor (fieldName: string, emailValidator: EmailValidator) {
    this.fieldName = fieldName
    this.emailValidator = emailValidator
  }

  validate (input: any): Error {
    const valid = this.emailValidator.isValid(input[this.fieldName])

    if (!valid) return new InvalidParamError(this.fieldName)
  }
}
