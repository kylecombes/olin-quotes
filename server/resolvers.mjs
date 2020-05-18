import {
  paginateResults,
} from './utils.mjs';

export default {
  Query: {
    board: (_,  { id }, { dataSources }) =>
      dataSources.boardAPI.getBoard(id),
    boards: (_, __, { dataSources }) =>
      dataSources.boardAPI.getBoardsForUser(),
    isLoggedIn: (_, __, { dataSources }) =>
      !!dataSources.userAPI.getCurrentUser(),
    quote: (_, { id }, { dataSources }) =>
      dataSources.quotesAPI.getQuote(id),
    quotes: async (_, { board: boardId, pageSize = 20, after }, { dataSources }) => {
      const allQuotes = await dataSources.quotesAPI.getBoardQuotes(boardId);
      const quotes = paginateResults({ after, pageSize, results: allQuotes });
      // Get the IDs of all the people referenced in the quotes
      const peopleIds = new Set();
      quotes.forEach(q => {
        // Add the person who added the quote
        if (q.addedById)
          peopleIds.add(q.addedById.toString());
        // Add anyone who is being quoted
        q.components.forEach(c => {
          if (c.personId) peopleIds.add(c.personId.toString())
        });
        // Add anyone who added a comment
        q.comments.forEach(c => {
          if (c.authorId) peopleIds.add(c.authorId.toString())
        });
      });
      const people = await dataSources.userAPI.findManyUsers(Array.from(peopleIds));
      return {
        quotes,
        people,
        cursor: quotes.length > 0 ? quotes[quotes.length - 1]._id : null,
        // If the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: quotes.length
          ? quotes[quotes.length - 1]._id !== allQuotes[allQuotes.length - 1]._id
          : false,
      };
    },
    user: async (_, __, { dataSources }) =>
      dataSources.userAPI.getCurrentUser(),
  },
  Mutation: {
    addQuote: async (_, { quote }, { dataSources }) => {
      if (await dataSources.boardAPI.isUserMemberOfBoard(quote.boardId) === false) {
        return null;
      }
      const savedQuote = await dataSources.quotesAPI.addQuote(quote);
      return {
        success: !!savedQuote,
        quote: savedQuote,
      };
    },
    login: async (_, { id }, { dataSources }) => {
      const user = await dataSources.userAPI.findUser(id);
      return {
        success: !!user,
        // FIXME: Insecure
        token: user ? Buffer.from(id).toString('base64') : null,
        user,
      }
    }
  }
}
