import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import config from './config/env'

const { port, mongoUrl } = config

const mongoHelper = MongoHelper.getInstance()

mongoHelper.connect(mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default

    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
  })
  .catch(e => console.error(e))
