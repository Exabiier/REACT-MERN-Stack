const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')



    // Get cuser tickets 
    // route: 'GET' /api/tickets
    // access Private
    const getTickets = asyncHandler( async (req, res) => {

        //  Getting the user form the id from the JWT token from the local storage:

        const user = await User.findById(req.user.id)

        if(!user){
            res.status(401)
            throw new Error('User not found')
        }

        const tickets = await Ticket.find({user: req.user.id})


       res.status(200).json(tickets)
       
    })

    // CREATE new tickets 
    // route: 'POST' /api/tickets
    // access Private
    const createTicket = asyncHandler( async (req, res) => {

        /////  checking if user filled out  info  ///////

        const {product, description} = req.body

        if(!product || !description){
            res.status(400)
            throw new Error("Please add a product and Description")
        }

        /////  checking if user does exists ////

        const user = await User.findById(req.user.id)

        if(!user){
            res.status(401)
            throw new Error('User not found')
        }

        ////////////// Creating a new ticket ///////////

        const ticket = await Ticket.create({
            product,
            description,
            user: req.user.id,
            status: 'new'
        })

        res.status(201).json(ticket)
        
     })

module.exports = {
    getTickets,
    createTicket,
}