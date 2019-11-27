import mongoose from 'mongoose';

const {
  ObjectId,
} = mongoose.Schema.Types;

const BoardSchema = new mongoose.Schema({
  createdBy: ObjectId,
  createdOn: Date,
  description: String,
  name: String,
});

// TODO: Filter the results for user
BoardSchema.statics.getBoards = function () {
  return this.find({}, {
    createdBy: false,
  });
};

export default mongoose.model('Board', BoardSchema);