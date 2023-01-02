const jwt = require('jsonwebtoken')
const { User, Video } = require('../models/userModels')
const auth = async (req, res, next) => {
    try {
        if (req.header('Authorization')) {
            const token = req.header('Authorization').replace('Bearer ', '')
            const sonuc = jwt.verify(token, 'n077o#2PANv*')
            const bulunanUser = await User.findOne({ _id: sonuc._id })
            if (bulunanUser) {
                req.user = bulunanUser
            }
            else {
                throw new Error('Lütfen Giriş Yapın')
            }
            next()
        }
        else {
            throw new Error('Lütfen Giriş Yapın')
        }


    }
    catch (error) {
        res.json({ 'error': 'Lütfen Giriş Yapın' })
    }


}

module.exports = auth