import DataSource from 'apollo-datasource';
import Board from '../models/board.mjs';

export default class BoardAPI extends DataSource.DataSource {

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

  getBoard = async (id) => {
    if (!this.context.user) return null;
    const board = await Board.findOne({ _id: id }).lean().exec();
    // Ensure that the current user is a member of the board
    const userId = this.context.user._id.toString();
    if (board.members.map(b => b.personId.toString()).indexOf(userId) >= 0) {
      return board;
    }
    return null;
  };

  getBoardsForUser = async () => {
    if (!this.context.user) return [];
    return await Board.getBoardsForUser(this.context.user._id).lean().exec();
  };

}
