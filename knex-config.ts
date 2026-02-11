import 'dotenv/config'

export default {
  development : {
    client : 'mysql2',
    connection: process.env.DATABASE_URL!,
    migrations : {
      extension : 'ts',
      directory : './database/migrations'
    }
  }
}