const Router = require('express').Router()
const authMiddleware = require('../middleware/authMiddleware')
const bcrypt = require('bcrypt')
const { User,Song} = require('../models/userModels')



Router.post('/login', async (req, res) => {
    try {
        const user = await User.login(req.body.userName, req.body.password)
        const token = await user.generateToken()
        res.json({ user, token })
    }
    catch (error) {
        res.json({ error })
    }
})

Router.post('/register', async (req, res) => {
    try {
        if (await User.findOne({ email: req.body.email })) {
            res.json({ error: 'Bu mail zaten kullanılıyor' })
        }
        else if (await User.findOne({ phoneNumber: req.body.phoneNumber })) {
            res.json({ error: 'Bu telefon numarası zaten kullanılıyor' })
        }
        else if (await User.findOne({ userName: req.body.userName })) {
            res.json({ error: 'Bu kullanıcı adı zaten kullanılıyor' })

        }
        else {
            let totalCode = ''
            for (let i = 0; i < 6; i++) {
                totalCode += Math.floor(Math.random() * 9)
            }
            const registerUser = new User(req.body)
            registerUser.password = await bcrypt.hash(registerUser.password, 8)
            registerUser.activeCode = totalCode
            const response = await registerUser.save()
            res.json(response)
        }
    }
    catch (e) {
        res.json(e)
    }
})

Router.get('/searchSong/:song',async(req,res)=>{
    try
    {
        const searchedSong = await Song.findOne({ musicName: { $regex: req.params.song } })
        res.json(searchedSong)
    }
    catch(e)
    {
        res.json(e)
    }
})


module.exports = Router