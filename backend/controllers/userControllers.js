const asyncHandler = require('express-async-handler')

// Register a new user
// route: /api/users
// access Public
const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password} = req.body

    // validation
    if(!name || !email || !password) {
        return res.status(400)
        throw new Error('Please include all fields')
    }

    res.send('Register Route')
} )

// Login a user
// route: /api/users/login
// access Public
const loginUser = asyncHandler( async (req, res) => {
    res.send('Login Route')
})

module.exports = {
    registerUser,
    loginUser,
}