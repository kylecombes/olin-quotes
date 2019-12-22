import mongoose from 'mongoose';

const {
  ObjectId,
} = mongoose.Schema.Types;

const QuoteSchema = new mongoose.Schema({
  addDate: Date,
  addedBy: ObjectId,
  board: ObjectId,
  comments: [
    {
      authorId: ObjectId,
      content: String,
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
