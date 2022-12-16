import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpes/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest } from '../protocols/http'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): any {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
