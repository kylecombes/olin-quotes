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

export default mongoose.model('Quote', QuoteSchema);
