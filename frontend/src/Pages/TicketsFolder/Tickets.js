import React from 'react'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getTickets, reset} from '../../features/tickets/ticketSlice'
import { BackButton } from '../New-Ticket/BackButton'
import Spinner from '../../Component/Spinner'
import TicketItem from './TicketItem'

function Tickets() {

    const {tickets, isLoading, isSuccess} = useSelector((state)=> state.tickets)

    const dispatch = useDispatch();

    // useEffect for dismounting:
    useEffect( () => {

        return () => {
            if(isSuccess){
                dispatch(reset())
            }
        }
        
    }, [isSuccess, dispatch])


    // useEffect for getting tickets:
    useEffect(()=> {

        dispatch(getTickets())

    },[dispatch])

    if(isLoading){
        return <Spinner />
    }


  return (
    <>
    <BackButton url="/" />
    <h1>Tickets</h1>
    <div className="tickets">
        <div className="ticket-headings">
            <div>Data</div>
            <div>Product</div>
            <div>Status</div>
            <div></div>
        </div>
        {tickets.map((ticket)=>(
            <TicketItem key={ticket._id} ticket={ticket} />
        ))}

    </div>

    </>
       
  )
}

export default Tickets