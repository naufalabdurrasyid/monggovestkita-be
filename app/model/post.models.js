const mongoose = require('mongoose')
const Schema = mongoose.Schema


const postSchema = Schema({
    author: String,
    foto: String,
    nama_ternak: String,
    asal: String,
    harga: String,
    lot_tersedia: Number
  });

  module.exports = mongoose.model('Post',postSchema);