import mongoose from 'mongoose';

const {
  ObjectId,
} = mongoose.Schema.Types;

const BoardSchema = new mongoose.Schema({
  createdBy: ObjectId,
  createdOn: Date,
  description: String,
  name: String,
  members: [{
    addedBy: ObjectId,
    addedOn: Date,
    personId: ObjectId,
    role: {
      type: String,
      enum: [
        'admin',
        'contributor',
        'viewer',
      ],
    },
  }],
});

const clientProjection = {
  '$members.addedBy': false,
  '$members.addedOn': false,
};

BoardSchema.statics.findOneForClient = function (boardId) {
  return this.findOne({_id: boardId}, clientProjection);
};

BoardSchema.statics.getBoardsForUser = function (userId) {
  return this.find({members: {$elemMatch: {personId: userId}}}, clientProjection);
};

BoardSchema.methods.getUserRole = function (userId) {
  for (let i = 0; i < this.members.length; ++i) {
    if (this.members[i].personId.equals(userId)) {
      return this.members[i].role;
    }
  }
  return null;
};

export default mongoose.model('Board', BoardSchema);
