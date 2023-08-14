const mongoose = require('mongoose');
const { ObjectId, Schema } = mongoose;

const userSchema = new Schema(
  {
    id: Number,
    userName: String,
    password: String,
    email: String,
    provider: String,
    createAt: Date,
    fixedLocation: String,
    tag: Array,
    avatar: {
      type: ObjectId,
      ref: 'Media'
    }
  },
  { collection: 'users' }
);

userSchema.statics.findOrCreate = async function findOrCreate(profile, cb) {
  var userObj = new this();
  const user = await this.findOne({ googeId: profile.id });
  if (!user) {
    userObj.userName = profile.displayName;
    userObj.googeId = profile.id;
    const newUser = await userObj.save();
    return newUser;
  } else {
    return user;
  }
};

module.exports = mongoose.model('User', userSchema);