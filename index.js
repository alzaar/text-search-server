import { ApolloServer } from 'apollo-server'
import 'dotenv/config'

import Schema from './schema'

const server = new ApolloServer({
  schema: Schema
})

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});