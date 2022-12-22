const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')


    //////////////////////////////////////////////////
    ////////////////  Get Notes //////////////////////
    //////////////////////////////////////////////////


    // Get Notes for  ticket
    // route: 'GET' /api/tickets/:ticketId/notes
    // access Private
    const getNotes = asyncHandler( async (req, res) => {

        //  Getting the user form the id from the JWT token from the local storage:

        const user = await User.findById(req.user.id)

        if(!user){
            res.status(401)
            throw new Error('User not found')
        }

        const ticket = await Ticket.findById(req.params.ticketId)

        if(ticket.user.toString() !== req.user.id){
            res.status(401)
            throw new Error('User not authorized')
        }

        const notes = await Note.find({ticket: req.params.ticketId})

       res.status(200).json(notes)
       
    })

     // Create  ticket
    // route: 'POST' /api/tickets/:ticketId/notes
    // access Private
    const addNote = asyncHandler( async (req, res) => {

        //  Getting the user form the id from the JWT token from the local storage:

        const user = await User.findById(req.user.id)

        if(!user){
            res.status(401)
            throw new Error('User not found')
        }

        const ticket = await Ticket.findById(req.params.ticketId)

        if(ticket.user.toString() !== req.user.id){
            res.status(401)
            throw new Error('User not authorized')
        }

        const note = await Note.create({
            text: req.body.text,
            isStaff: false,
            user: req.params.ticketId,
            ticket: req.params.ticketId})

       res.status(200).json(note)
       
    })


    module.exports = {
        getNotes,
        addNote
    }