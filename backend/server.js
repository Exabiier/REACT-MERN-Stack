const path = require('path')

// Common javascript syntacts 
const express = require('express')

const dotenv = require(`dotenv`).config()

const colors = require('colors')

const connectDB = require('./config/db')

const {errorHandler} = require('./middleware/errorMiddleware')

// this is the port in which 
const PORT = process.env.PORT || 5050

// connect to to database:
connectDB()

// We are calling the express method into a varable. 
const app = express()

// this is middleware that accepts json files
app.use(express.json())

//  this is middleware that accepts form key value pairs
app.use(express.urlencoded({extened: false}))

// get request in express:
// app.get('/', (req, res) => {
//     // res.send('Hello')
//     res.status(200).json({message: 'Welcome to the the support desk API'})
// })

// Routes
app.use('/api/users', require('./routes/userRoutes'))

app.use('/api/tickets', require('./routes/ticketRoutes'))

// Server Frontend
if(process.env.NODE_ENV === 'production'){
    
    // set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))

} else{

// get request in express:
app.get('/', (req, res) => {
    // res.send('Hello')
    res.status(200).json({message: 'Welcome to the the support desk API'})
})

}

// Error handler:
app.use(errorHandler)


// This is the port were the server will isten to
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))

