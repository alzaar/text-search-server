import utils from '../../utils'
import { QUANTITY_PER_PAGE } from '../constants/AppConstants'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
const esSerialize = new utils.ESSerialize()

export default {
  Query: {
    getQuotes: async (parent, args, context, info) => {
      const res = esSerialize.getSerializedResults((await client.search({
        index: process.env.ELASTIC_SEARCH_INDEX,
        from: args.page,
        size: QUANTITY_PER_PAGE,
      })).body)
      return {
        total: res.total,
        data: res.data
      }
    },
    getFilteredQuotes: async (parent, args, context, info) => {
      const field = Object.keys(args)[0]
      const res = esSerialize.getSerializedResults((await client.search({
        index: process.env.ELASTIC_SEARCH_INDEX,
        from: args.page,
        size: QUANTITY_PER_PAGE,
        body: {
          query: {
            query_string: {
              query: args[field] + '*',
              default_field: field
            }
          }
        }
      })).body)

      return {
        total: res.total,
        data: res.data
      }
    }
  },
  Mutation: {
    saveQuote: async (parent, args, context, info) => {
      const { body } = args
      try {
        await client.index({
          index: process.env.ELASTIC_SEARCH_INDEX,
          body: body,
          refresh: true,
        })
        return {
          status: 201,
          message: 'Created'
        }
      } catch(e) {
        console.log(e)
        return {
          status: 500,
          error: e,
          message: 'Server Error'
        }
      }
    }
  }
}
