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
    thirdPartyId: String,
    avatar: {
      type: ObjectId,
      ref: 'Media'
    },
  },
  { collection: 'users' }
);

userSchema.statics.findOrCreate = async function findOrCreate(profile, cb) {
  var userObj = new this();
  const user = await this.findOne({ thirdPartyId: profile.id });
  if (!user) {
    userObj.userName = profile.displayName;
    userObj.thirdPartyId = profile.id;
    userObj.email = profile.email;
    userObj.provider = profile.provider;
    const newUser = await userObj.save();
    return newUser;
  } else {
    return user;
  }
};

module.exports = mongoose.model('User', userSchema);