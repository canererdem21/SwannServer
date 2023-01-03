const Router = require('express').Router()
const authMiddleware = require('../middleware/authMiddleware')
const bcrypt = require('bcrypt')
const { User, Song, Album } = require('../models/userModels')



Router.post('/login', async (req, res) => {
    try {
        const user = await User.login(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.json({ user, token })
    }
    catch (error) {
        res.json(error)
    }
})

Router.post('/register', async (req, res) => {
    try {
        if (await User.findOne({ email: req.body.email })) {
            res.json({ error: 'This e-mail address is used' })
        }

        else {
            const registerUser = new User(req.body)
            registerUser.password = await bcrypt.hash(registerUser.password, 8)
            const response = await registerUser.save()
            res.json(response)
        }
    }
    catch (e) {
        res.json(e)
    }
})

Router.post('/changeMyData', authMiddleware, async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.user._id }, { name: req.body.name, surName: req.body.surName }, { new: true })
        res.json({ success: 'success' })
    }
    catch (e) {
        res.json(e)
    }
})

Router.get('/getAlbumCategory/:category', async (req, res) => {
    try {
        const album = await Song.find({ category: req.params.category })
        res.json(album)
    }
    catch (e) {
        res.json(e)
    }
})

Router.post('/changeMyPassword', authMiddleware, async (req, res) => {
    try {
        const checkPassword = await bcrypt.compare(req.body.oldPassword, req.user.password)
        if (checkPassword) {
            const newPassword = await bcrypt.hash(req.body.newPassword, 8)
            await User.findOneAndUpdate({ _id: req.user._id }, { password: newPassword }, { new: true })
            res.json({ success: 'success' })
        }
        else {
            res.json({ error: 'Your old password is incorrect' })
        }
    }
    catch (e) {
        res.json(e)
    }
})

Router.get('/getMyInfo', authMiddleware, async (req, res) => {
    try {
        let user = req.user
        res.json(user)
    }
    catch (e) {
        res.json(e)
    }
})

Router.get('/searchSong/:song', async (req, res) => {
    try {
        const searchedSong = await Song.find({ musicName: { $regex: req.params.song } })
        res.json(searchedSong)
    }
    catch (e) {
        res.json(e)
    }
})

Router.get('/getAllSong', async (req, res) => {
    try {
        const allSong = await Song.find()
        res.json(allSong)
    }
    catch (e) {
        res.json(e)
    }
})

Router.get('/getHomeData', async (req, res) => {
    try {
        const homeData = await Album.find()
        const trendingData = []
        const relaxingData = []
        const moodData = []

        homeData.map((item) => {
            if (item.albumName == 'Populer')
                trendingData.push(item)
            else if (item.albumName == 'Favorite')
                trendingData.push(item)
            else if (item.albumName == 'Calm Sound')
                relaxingData.push(item)
            else if (item.albumName == 'Sleep Sound')
                relaxingData.push(item)
            else if (item.albumName == 'Good Morning')
                moodData.push(item)
            else if (item.albumName == 'Lo-Fi')
                moodData.push(item)
        })
        res.json({ trendingData, relaxingData, moodData })
    }
    catch (e) {
        res.json(e)
    }
})


Router.get('/getPlayList/:name', async (req, res) => {
    try {
        const selected = await Album.findOne({ albumName: req.params.name })
        const data = await Song.find({ category: selected.albumCategory })
        res.json(data)
    }
    catch (e) {
        res.json(e)
    }
})


module.exports = Router