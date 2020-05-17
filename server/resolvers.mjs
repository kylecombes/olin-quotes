import {
  paginateResults,
} from './utils.mjs';

export default {
  Query: {
    boards: (_, __, { dataSources }) =>
      dataSources.boardAPI.getBoardsForUser(),
    quote: (_, { id }, { dataSources }) =>
      dataSources.quotesAPI.getQuote(id),
    quotes: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allQuotes = await dataSources.quotesAPI.getAllQuotes();
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
  },
  Mutation: {
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
