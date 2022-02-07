export default `
  """Quote Type"""
  type Quote {
    id: String!
    author: String!
    content: String!
    tags: [String!]
    reference: String!
    book_title: String!
    link: String!
    infallible: String!
  }

  type Result {
    total: Int!
    data: [Quote]
  }

  type Response {
    status: Int!
    message: String!
    error: String
  }
  
  """Get Quotes By Document Field"""
  type Query {
    getFilteredQuotes(
      infallible: String  
      author: String
      content: String
      tags: String
      reference: String
      book_title: String
      link: String
      page: String!
    ): Result!
  }

  """Get Quotes By Document Field"""
  type Query {
    getQuotes(page: String!): Result!
  }

  input QuoteBody {
    infallible: String  
    author: String
    content: String
    tags: String
    reference: String
    book_title: String
    link: String
  }

  type Mutation {
    saveQuote(body: QuoteBody!): Response! 
  }

`