const mongoose = require('mongoose')
const Schema = mongoose.Schema
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()
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

    profilePicture: {
        type: String,
        default: 'https://emamo.com/storage/avatars/2f/fd/180247_59678437f52bf2520aa722a4c49f2ffd.jpg'
    },
    follow: [{
        id: {
            type: String
        },
        profilePicture: {
            type: String
        },
    }],
    follower: [{
        id: {
            type: String
        },
        profilePicture: {
            type: String
        },

    }],
    favoriteSong: []
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
}, { collection: 'Song' })


const albumSchema = new Schema({
    albumName: {
        type: String
    },
    albumImage: {
        type: String
    },
    albumCategory: {
        type: String
    }
}, { collection: 'Album' })


userSchema.methods.generateToken = async function () {
    const loggedUser = this
    const token = await jwt.sign({ _id: loggedUser._id, profilePicture: loggedUser.profilePicture }, process.env.JWT_TOKEN)
    return token
}
userSchema.statics.login = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {

        throw createError(400, "No User Found for the Entered Information")

    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if (checkPassword) {
        return user
    }
    else {
        throw createError(400, "No User Found for the Entered Information")
    }
}


const User = mongoose.model('User', userSchema)
const Song = mongoose.model('Song', songSchema)
const Album = mongoose.model('Album', albumSchema)

module.exports = { User, Song, Album }
