const mongoose = require('mongoose')
const mongodb = require('mongodb')
const dotenv = require('dotenv');
dotenv.config()

const uri = process.env.DB_URL;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'Swann' }).then(() => { console.log('DB Bağlantısı Başarılı') }).catch((error) => { console.log("Hatali bağlanti", error) })
