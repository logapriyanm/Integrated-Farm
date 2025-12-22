import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    userId: { type: String, required: false }, // Optional, link to user if logged in
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    visitors: { type: Number, required: true, min: 1 },
    message: { type: String, required: false },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Cancelled'] },
    dateBooked: { type: Date, default: Date.now }
});

const TicketModel = mongoose.models.ticket || mongoose.model('Ticket', ticketSchema);

export default TicketModel;
