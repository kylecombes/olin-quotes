import mongoose from 'mongoose';

const {
  ObjectId,
} = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  accountSetupComplete: Boolean,
  firstName: String,
  lastName: String,
  displayName: String,
  classYear: Number,
  avatarUrl: String,
  connectedAccounts: {
    google: {
      id: String,
    },
    facebook: {
      id: String,
    }
  },
});

UserSchema.statics.findByFacebookId = function (id) {
  return this.find({
    connectedAccounts: {
      facebook: {
        id,
      },
    },
  });
};

UserSchema.statics.findByGoogleId = function (id) {
  return this.find({
    connectedAccounts: {
      google: {
        id,
      },
    },
  });
};

export default mongoose.model('User', UserSchema);