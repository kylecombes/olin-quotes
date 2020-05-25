import DataSource from 'apollo-datasource';
import Board from '../models/board.mjs';
import User from '../models/user.mjs';

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
    if (await this.isUserMemberOfBoard(id, board)) {
      return board;
    }
    return null;
  };

  getBoardMembers = async (id) => {
    if (!this.context.user) return [];
    const board = await Board.findOne({ _id: id }, { members: true }).lean().exec();
    if (await this.isUserMemberOfBoard(id, board) === false)
      return [];
    const idToMember = {};
    board.members.forEach(m => idToMember[m.personId] = m);
    const memberIds = board.members.map(m => m.personId.toString());
    const members = await User.find({ _id: memberIds }).lean().exec();
    // Attach the member roles
    members.forEach(m => m.role = idToMember[m._id.toString()].role);
    return members;
  }

  getBoardsForUser = async () => {
    if (!this.context.user) return [];
    return await Board.getBoardsForUser(this.context.user._id).lean().exec();
  };

  isUserMemberOfBoard = async (boardId, board = null) => {
    if (!board) {
      board = await Board.findOne({_id: boardId}).lean().exec();
    }
    const userId = this.context.user._id.toString();
    return board.members.map(b => b.personId.toString()).indexOf(userId) >= 0;
  };

}
