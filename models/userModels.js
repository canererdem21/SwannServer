const mongoose = require('mongoose')
const Schema = mongoose.Schema
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String
    },
    profilePicture: {
        type: String,
        default: 'https://mir-s3-cdn-cf.behance.net/projects/404/3278b4138283011.Y3JvcCwxOTIwLDE1MDEsMCw2ODk.jpg'
    },
    follow: [{
        id: {
            type: String
        },
        profilePicture: {
            type: String
        },
        userName: {
            type: String
        }
    }],
    follower: [{
        id: {
            type: String
        },
        profilePicture: {
            type: String
        },
        userName: {
            type: String
        }
    }],
    favoriteSong:[]
}, { collection: 'User' })


const songSchema = new Schema({
    id: {
        type: Number
    },
    musicCID: {
        type: String
    },
    imageCID: {
        type: String
    },
    musicExt: {
        type: String
    },
    musicName: {
        type: String
    },
    category: {
        type: String
    },
    imageName: {
        type: String
    }
},{collection:'Song'})


userSchema.methods.generateToken = async function () {
    const loggedUser = this
    const token = await jwt.sign({ _id: loggedUser._id, profilePicture: loggedUser.profilePicture }, 'n077o#2PANv*')
    return token
}
userSchema.statics.login = async (userName, password) => {
    const user = await User.findOne({ userName })
    if (!user) {

        throw createError(400, "Girilen Bilgilere Ait Kullanıcı Bulunamadi")

    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if (checkPassword) {
        return user
    }
    else {
        throw createError(400, "Girilen Bilgilere Ait Kullanıcı Bulunamadi")
    }
}


const User = mongoose.model('User', userSchema)
const Song = mongoose.model('Song', songSchema)

module.exports = {User,Song}
