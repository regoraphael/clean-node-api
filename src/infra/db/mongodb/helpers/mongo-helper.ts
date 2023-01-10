import { Collection, MongoClient } from 'mongodb'

export class MongoHelper {
  private static instance: MongoHelper
  private client: MongoClient

  private constructor () {}

  public static getInstance (): MongoHelper {
    if (!this.instance) {
      this.instance = new MongoHelper()
    }

    return this.instance
  }

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  }

  async disconnect (): Promise<void> {
    await this.client.close()
  }

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}
