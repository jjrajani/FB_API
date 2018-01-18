const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  facebookId: String,
  username: String
});

mongoose.model('users', userSchema);
