// Import workaround from https://github.com/apollographql/apollo-server/issues/1356
import ApolloServer from 'apollo-server';
const { gql } = ApolloServer;

export default gql`
  type Quote {
    _id: ID!
    addDate: String
    addedById: ID
    boardId: ID
    comments: String
    components: String
    likes: Int
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
      quotes: [Quote]!
      quote(id: ID!): Quote
      user: User
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
