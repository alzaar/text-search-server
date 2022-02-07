import { makeExecutableSchema } from '@graphql-tools/schema'
import quoteResolvers from './resolvers/quoteResolvers'
import quotes from './typeDefs/quotes'

export default makeExecutableSchema({
  typeDefs: [quotes],
  resolvers: Object.assign(quoteResolvers)
})
