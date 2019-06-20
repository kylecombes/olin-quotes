import mongoose from 'mongoose';

const {
  ObjectId,
} = mongoose.Schema.Types;

const QuoteSchema = new mongoose.Schema({
  addDate: Date,
  addedBy: ObjectId,
  components: [
    {
      personId: ObjectId,
      words: String,
    }
  ],
});

export default mongoose.model('Quote', QuoteSchema);