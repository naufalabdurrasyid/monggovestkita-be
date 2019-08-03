const mongoose = require('mongoose')
const Schema = mongoose.Schema
const lotSchema = Schema({
    posts: String,
    investor: String,
    lot_tersedia: Number,
    jumlah_lot: Number,
    total_harga: Number,
    nama_ternak: String,
    asal: String,
    harga: Number,
    foto: String

  });

  module.exports = mongoose.model('Lot',lotSchema);