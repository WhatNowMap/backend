const mongoose = require('mongoose');
const { Schema } = mongoose;

type profile = {
  id: String,
  provider: String
}

const userSchema = new Schema({
  id: Number,
  googeId: String,
  userName: String,
  password: String,
  email: String,
  fixedLocation: String,
  tag: Array
},{ collection: 'users' });

userSchema.statics.findOrCreate = async function findOrCreate(profile, cb){
  var userObj = new this();
  const user = await this.findOne({googeId: profile.id})
  if(!user){
    userObj.userName = profile.displayName;
    userObj.googeId = profile.id;
    const newUser = await userObj.save();
    return newUser;
  }else{
    return user;
  }
};

module.exports = mongoose.model('User', userSchema)