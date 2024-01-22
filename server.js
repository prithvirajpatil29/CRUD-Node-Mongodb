const express = require('express')
const app = express()
const connectDB = require('./db/connectDB')
const {readAllUsers,readSingleUser,createUser, updateUser,deleteUser} = require('./controllers/userController')
require('dotenv').config()
app.use(express.json());

app.get('/', (req, res) => {
    res.json({msg : 'Server has started'})
})
app.get('/all', readAllUsers)
app.get('/single/:id', readSingleUser)
app.post('/create', createUser)
app.put('/update/:id',updateUser)
app.delete('/delete/:id', deleteUser)
app.listen(4400, () => {
    connectDB()
    console.log('server started http://localhost:4400')
})