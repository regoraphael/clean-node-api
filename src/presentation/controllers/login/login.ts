import { Authentication } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      const validEmail = this.emailValidator.isValid(email)

      if (!validEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      if (!password) {
        return badRequest(new MissingParamError('password'))
      }

      await this.authentication.auth(email, password)

      return badRequest(new MissingParamError('email'))
    } catch (error) {
      return serverError(error)
    }
  }
}
