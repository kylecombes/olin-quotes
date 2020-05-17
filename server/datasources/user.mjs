import DataSource from 'apollo-datasource';
import User from '../models/user.mjs';

export default class UserAPI extends DataSource.DataSource {

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

  findUser = async (id) => {
    return await User.findOne({ _id: id }).lean().exec();
  };

  findManyUsers = async (ids) => {
    return await User.find({ _id: ids }).lean().exec();
  };

  // TODO: Restrict access to protected fields/attributes
  getCurrentUser = () => this.context.user;

}
