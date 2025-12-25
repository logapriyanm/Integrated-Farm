import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../../config'
import { toast } from 'react-toastify'
import { FaCalendarCheck } from "react-icons/fa";

const Tickets = () => {

    const [tickets, setTickets] = useState([])
    const token = localStorage.getItem("token");

    const fetchTickets = async () => {
        try {
            if (!token) return null;
            const response = await axios.get(backendUrl + '/api/ticket/list', { headers: { token } })
            if (response.data.success) {
                setTickets(response.data.tickets)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const approveTicket = async (ticketId) => {
        try {
            const response = await axios.post(backendUrl + '/api/ticket/approve', { ticketId }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                fetchTickets()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelTicket = async (ticketId) => {
        try {
            const response = await axios.post(backendUrl + '/api/ticket/cancel', { ticketId }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                fetchTickets()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchTickets()
    }, [token])

    return (
        <div className="pb-10 px-1 rounded-md md:px-8 bg-gray-50 min-h-screen">
            <h3 className="text-2xl pt-4 md:text-3xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
                <FaCalendarCheck /> Booked Tickets
            </h3>
            <div className="flex flex-col gap-4">
                {tickets.map((ticket) => (
                    <div key={ticket._id} className="bg-white border rounded-lg p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition">
                        <div className="flex-1">
                            <p className="font-semibold text-lg text-gray-800">{ticket.name}</p>
                            <p className="text-gray-600">{ticket.email}</p>
                            <p className="text-gray-600">{ticket.phone}</p>
                            <div className="mt-2 flex gap-4 text-sm">
                                <p className="bg-blue-50 text-blue-700 px-2 py-1 rounded">Visitors: <span className="font-bold">{ticket.visitors}</span></p>
                                <p className="bg-purple-50 text-purple-700 px-2 py-1 rounded">Date: <span className="font-bold">{new Date(ticket.date).toDateString()}</span></p>
                            </div>
                            {ticket.message && <p className="text-sm text-gray-500 mt-2 bg-gray-50 p-2 rounded italic">"{ticket.message}"</p>}
                            <p className={`mt-3 text-sm font-bold inline-block px-3 py-1 rounded-full ${ticket.status === 'Approved' ? 'bg-green-100 text-green-700' : ticket.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'}`}>
                                {ticket.status}
                            </p>
                        </div>
                        {ticket.status === 'Pending' && (
                            <div className="flex flex-col gap-2 w-full md:w-auto">
                                <button onClick={() => approveTicket(ticket._id)} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium">Approve</button>
                                <button onClick={() => cancelTicket(ticket._id)} className="bg-red-50 text-red-600 border border-red-200 px-6 py-2 rounded-lg hover:bg-red-100 transition font-medium">Cancel</button>
                            </div>
                        )}
                        {ticket.status !== 'Pending' && (
                            <div className="text-gray-400 text-sm">
                                {ticket.status === 'Approved' ? 'Approved & Email Sent' : 'Cancelled'}
                            </div>
                        )}
                    </div>
                ))}
                {tickets.length === 0 && <div className="text-center py-20 text-gray-400">No tickets booked yet.</div>}
            </div>
        </div>
    )
}

export default Tickets
