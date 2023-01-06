const express = require('express')
const app = express()
const userRouter = require('./routes/userRouter')
const dotenv = require('dotenv');
dotenv.config()

require('./database/dbConnection')


app.use(express.static('views'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/user/api/", userRouter)

let PORT = process.env.PORT || 2020

const server = app.listen(PORT, () => {
    console.log(`Server ${PORT} Porutyla Açık`)
})
