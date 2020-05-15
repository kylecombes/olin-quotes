export default {
  Query: {
    quotes: (_, __, { dataSources }) =>
      dataSources.quotesAPI.getAllQuotes(),
  }
}
