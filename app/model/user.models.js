const mongoose = require('mongoose');
const Schema = mongoose.Schema
const UserSchema = new mongoose.Schema({
 
 
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  user_foto: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    required: true
  },
  
  posts: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
    
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  foto: String,
  nama_ternak: String,
  asal: String,
  harga: Number,
  lot_tersedia: Number,

  lots: {
    type: Schema.Types.ObjectId,
    ref: 'Lot'
  },
  invests: {
    type: Schema.Types.ObjectId,
    ref: 'Invest'
  },
    investor: { type: Schema.Types.ObjectId, ref: 'User' },
  
}
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
