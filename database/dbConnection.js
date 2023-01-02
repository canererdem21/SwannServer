const mongoose = require('mongoose')
const mongodb = require('mongodb')
const uri = "mongodb+srv://canererdem21:Xj9nac4f2112@testdatabase.vsdji.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'Swann' }).then(() => { console.log('DB Bağlantısı Başarılı') }).catch((error) => { console.log("Hatali bağlanti", error) })
