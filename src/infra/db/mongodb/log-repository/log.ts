import { LogErrorRepository } from '../../../../data/protocols/log-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  private readonly mongoHelper: MongoHelper

  constructor () {
    this.mongoHelper = MongoHelper.getInstance()
  }

  async logError (stack: string): Promise<void> {
    const errorCollection = await this.mongoHelper.getCollection('errors')

    await errorCollection.insertOne({ stack, date: new Date() })
  }
}
