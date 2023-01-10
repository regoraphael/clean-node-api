import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  private readonly mongoHelper = MongoHelper.getInstance()
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = this.mongoHelper.getCollection('accounts')

    const { insertedId } = await accountCollection.insertOne(accountData)

    return { id: insertedId.toString(), ...accountData }
  }
}
