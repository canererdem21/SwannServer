const express = require('express')
const app = express()
const userRouter = require('./routes/userRouter')

require('./database/dbConnection')


app.use(express.static('views'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/user/api/", userRouter)

let PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Server ${PORT} Porutyla Açık`)
})
