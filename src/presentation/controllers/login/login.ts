import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body

    const validEmail = this.emailValidator.isValid(email)

    if (!validEmail) {
      return badRequest(new InvalidParamError('email'))
    }

    if (!password) {
      return badRequest(new MissingParamError('password'))
    }

    return badRequest(new MissingParamError('email'))
  }
}
