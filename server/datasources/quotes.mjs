import DataSource from 'apollo-datasource';
import Quote from '../models/quote.mjs';

export default class QuotesAPI extends DataSource.DataSource {

  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  getAllQuotes = async () => {
    return await Quote.find({}).lean().exec();
  };

}
