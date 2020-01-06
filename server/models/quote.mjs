import mongoose from 'mongoose';

const {
  ObjectId,
} = mongoose.Schema.Types;

const Like = new mongoose.Schema({
  date: Date,
  personId: ObjectId,
});

const QuoteSchema = new mongoose.Schema({
  addDate: Date,
  addedById: ObjectId,
  boardId: ObjectId,
  comments: [
    {
      added: Date,
      authorId: ObjectId,
      content: String,
      lastEdited: Date,
      likes: [Like],
    }
  ],
  components: [
    {
      personId: ObjectId,
      content: String,
    }
  ],
  likes: [Like],
});

QuoteSchema.statics.findQuoteByComment = function (commentId) {
  return this.findOne({comments: {$elemMatch: {_id: commentId}}});
};

QuoteSchema.methods.getCommentById = function (commentId) {
  for (let i = 0; i < this.comments.length; ++i)
    if (this.comments[i]._id.equals(commentId))
      return this.comments[i];
  return null;
};

QuoteSchema.statics.findByBoardId = function (boardIds) {
  return this.find({ boardId: {$in: boardIds} });
};

export default mongoose.model('Quote', QuoteSchema);
