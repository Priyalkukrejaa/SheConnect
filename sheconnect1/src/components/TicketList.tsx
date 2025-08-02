import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Ticket {
_id: string;
title: string;
description: string;
createdAt: string;
}

const TicketList = () => {
const [tickets, setTickets] = useState<Ticket[]>([]);

useEffect(() => {
axios.get('http://localhost:5050/tickets')
.then((response) => {
setTickets(response.data);
})
.catch((error) => {
console.error('Error fetching tickets:', error);
});
}, []);

return (
    <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Tickets</h2>
        {tickets.map((ticket) => (
            <div key={ticket._id} className="bg-white rounded shadow p-4 mb-3">
            <h3 className="text-lg font-semibold">{ticket.title}</h3>
            <p>{ticket.description}</p>
            <small className="text-gray-500">
            {new Date(ticket.createdAt).toLocaleString()}
            </small>
        </div>
    ))}
    </div>
);
};

export default TicketList;

