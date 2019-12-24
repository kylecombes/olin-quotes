import mongoose from 'mongoose';

const {
  ObjectId,
} = mongoose.Schema.Types;

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
    }
  ],
  components: [
    {
      personId: ObjectId,
      content: String,
    }
  ],
});

export default mongoose.model('Quote', QuoteSchema);
