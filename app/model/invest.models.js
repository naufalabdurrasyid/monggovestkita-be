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
    status: String

  });

  module.exports = mongoose.model('Invest',investSchema);