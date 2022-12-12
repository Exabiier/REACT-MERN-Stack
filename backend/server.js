// Common javascript syntacts 
const express = require('express')

const dotenv = require(`dotenv`).config()

const {errorHandler} = require('./middleware/errorMiddleware')

// this is the port in which 
const PORT = process.env.PORT || 5050

// We are calling the express method into a varable. 
const app = express()

// this is middleware that accepts json files
app.use(express().json())

//  this is middleware that accepts form key value pairs
app.use(express.urlencoded({extened: false}))

// get request in express:
app.get('/', (req, res) => {
    // res.send('Hello')
    res.status(200).json({message: 'Hello'})

})

// Routes
app.use('/api/users', require('./routes/userRoutes'))

// Error handler:
app.use(errorHandler)


// This is the port were the server will isten to
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))

