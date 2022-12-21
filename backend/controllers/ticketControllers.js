const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')


    //////////////////////////////////////////////////
    ////////////////  Get all ticket /////////////////
    //////////////////////////////////////////////////


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

    //////////////////////////////////////////////////
    ////////////  Getting a single ticket ////////////
    //////////////////////////////////////////////////

    // Get cuser ticket 
    // route: 'GET' /api/tickets:id
    // access Private
    const getTicket = asyncHandler( async (req, res) => {

        //  Getting the user form the id from the JWT token from the local storage:

        const user = await User.findById(req.user.id)

        if(!user){
            res.status(401)
            throw new Error('User not found')
        }

        const ticket = await Ticket.findById(req.params.id)

        if(!ticket){
            res.status(404)
            throw new Error('Ticket not found')
        }

        if(ticket.user.toString() !== req.user.id){
            res.status(401)
            throw new Error('Not Authorized')
        }

       res.status(200).json(ticket)
       
    })


    //////////////////////////////////////////////////
    ////////////  Create a single ticket /////////////
    //////////////////////////////////////////////////

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


    ///////////////////////////////////////////////////
    ///////////////  Delete a ticket  ////////////////
    //////////////////////////////////////////////////

    // Get Delete ticket 
    // route: 'DELETE' /api/tickets:id
    // access Private
    const deleteTicket = asyncHandler( async (req, res) => {

        //  Getting the user form the id from the JWT token from the local storage:

        const user = await User.findById(req.user.id)

        if(!user){
            res.status(401)
            throw new Error('User not found')
        }

        const ticket = await Ticket.findById(req.params.id)

        if(!ticket){
            res.status(404)
            throw new Error('Ticket not found')
        }

        if(ticket.user.toString() !== req.user.id){
            res.status(401)
            throw new Error('Not Authorized')
        }

        await ticket.remove()

       res.status(200).json({success: true})

    })

    //////////////////////////////////////////////////
    ////////////  Update a single ticket ////////////
    //////////////////////////////////////////////////

    // Update ticket 
    // route: 'PUT' /api/tickets:id
    // access Private
    const updateTicket = asyncHandler( async (req, res) => {

        //  Getting the user form the id from the JWT token from the local storage:

        const user = await User.findById(req.user.id)

        if(!user){
            res.status(401)
            throw new Error('User not found')
        }

        const ticket = await Ticket.findById(req.params.id)

        if(!ticket){
            res.status(404)
            throw new Error('Ticket not found')
        }

        if(ticket.user.toString() !== req.user.id){
            res.status(401)
            throw new Error('Not Authorized')
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})

       res.status(200).json(updatedTicket)
       
    })

module.exports = {
    getTickets,
    createTicket,
    getTicket,
    updateTicket,
    deleteTicket
}