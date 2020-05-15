// Import workaround from https://github.com/apollographql/apollo-server/issues/1356
import ApolloServer from 'apollo-server';
const { gql } = ApolloServer;

export default gql`
  type Quote {
    _id: ID!
    addDate: String
    addedById: ID
    boardId: ID
    comments: [QuoteComment]
    components: [QuoteComponent]
    likes: [Like]
  }

  type QuoteComment {
    added: String
    authorId: ID
    content: String
    lastEdited: String
    likes: [Like]
  }

  type QuoteComponent {
    personId: ID
    content: String
  }

  type Like {
    date: String
    personId: ID
  }

  type User {
    accountSetupComplete: Boolean
    firstName: String
    lastName: String
    displayName: String
    classYear: Int
    avatarUrl: String
    connectedAccounts: [ConnectedAccount]
  }

  type ConnectedAccount {
    siteName: String
    id: ID
  }
  
  type Query {
      quotes(
          """
          The number of quotes to get. Must be >= 1. Default = 30.
          """
          pageSize: Int
          """
          If you add a cursor here, it will only return results after this cursor.
          """
          after: String
      ): QuoteConnection!
      quote(id: ID!): Quote
      user: User
  }
  
  """
  Simple wrapper around the list of quotes that contains a cursor to the last quote in the list.
  Pass this cursor to the quotes query to fetch quotes after these.
  """
  type QuoteConnection {
      cursor: String!
      hasMore: Boolean!
      quotes: [Quote]!
  }

  type Mutation {
      addQuote(quote: String): AddQuoteResponse
  }
  
  type AddQuoteResponse {
      success: Boolean!
      message: String
      quote: Quote
  }
`;
