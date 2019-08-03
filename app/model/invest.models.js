const mongoose = require('mongoose')
const Schema = mongoose.Schema


const investSchema = Schema({
    lots: String,
    investor: String,
    nama_lengkap: String,
    nomor_ktp: String,
    alamat_lengkap: String,
    nomor_hp: Number,
    email_konfirmasi: String,
    metode_pembayaran: String,
    jumlah_lot: Number,
    foto: String,
    nama_ternak: String,
    asal: String,
    harga: Number,
    posts: String,
    status: String,
    total_harga: Number
  });

  module.exports = mongoose.model('Invest',investSchema);