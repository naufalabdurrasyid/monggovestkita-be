const mongoose = require('mongoose')
const Schema = mongoose.Schema
const lotSchema = Schema({
    posts: String,
    investor: String,
    lot_tersedia: Number,
    jumlah_lot: Number 

  });

  module.exports = mongoose.model('Lot',lotSchema);