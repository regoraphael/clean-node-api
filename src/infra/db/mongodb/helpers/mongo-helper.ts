import { Collection, MongoClient } from 'mongodb'

export class MongoHelper {
  private static instance: MongoHelper
  private client: MongoClient
  private uri: string

  private constructor () {}

  public static getInstance (): MongoHelper {
    if (!this.instance) {
      this.instance = new MongoHelper()
    }

    return this.instance
  }

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
    this.uri = uri
  }

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  }

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  }

  map ({ _id, ...rest }: any): any {
    return { id: _id, ...rest }
  }
}
