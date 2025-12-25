import TicketModel from "../models/ticketModel.js";
import nodemailer from "nodemailer";

// Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Create Ticket
export const bookTicket = async (req, res) => {
    try {
        const { name, email, phone, date, visitors, message } = req.body;
        const userId = req.user.id;
        
        const newTicket = new TicketModel({
            name, email, phone, date, visitors, message, userId
        });

        await newTicket.save();

        // Send confirmation email (non-blocking)
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Ticket Booking Confirmation - Integrated Farm',
            text: `Hello ${name},\n\nYour ticket booking request has been received.\n\nDetails:\nDate: ${new Date(date).toDateString()}\nVisitors: ${visitors}\n\nStatus: Pending (Waiting for Admin Approval)\n\nBest regards,\nIntegrated Farm Team`
        };

        transporter.sendMail(mailOptions).catch(emailError => {
            console.log("Booking email error:", emailError);
        });

        res.json({ success: true, message: "Ticket Booked" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Get All Tickets (Admin)
export const getAllTickets = async (req, res) => {
    try {
        const tickets = await TicketModel.find({}).sort({ dateBooked: -1 });
        res.json({ success: true, tickets });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Approve Ticket (Admin)
export const approveTicket = async (req, res) => {
    try {
        const { ticketId } = req.body;
        const ticket = await TicketModel.findByIdAndUpdate(ticketId, { status: 'Approved' }, { new: true });
        
        if (ticket) {
            // Send Email

            // Check for credentials
            if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
                console.log("Email credentials missing in .env");
                return res.json({ success: true, message: "Ticket approved, but email failed: Credentials missing." });
            }

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: ticket.email,
                subject: 'Visit Request Approved - Integrated Farm',
                text: `Hello ${ticket.name},\n\nYour visit to Integrated Farm on ${new Date(ticket.date).toDateString()} has been approved!\n\nDetails:\nVisitors: ${ticket.visitors}\n\nWe look forward to seeing you.\n\nBest regards,\nIntegrated Farm Team`
            };

            // Send Email non-blocking
            transporter.sendMail(mailOptions)
                .then(info => console.log('Email sent: ' + info.response))
                .catch(emailError => console.log("Email error:", emailError));

            res.json({ success: true, message: "Ticket approved." });
        } else {
            res.json({ success: false, message: "Ticket not found." });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Cancel Ticket (Admin)
export const cancelTicket = async (req, res) => {
    try {
        const { ticketId } = req.body;
        await TicketModel.findByIdAndUpdate(ticketId, { status: 'Cancelled' });
        res.json({ success: true, message: "Ticket cancelled." });
    } catch (error) {
         console.log(error);
         res.json({ success: false, message: error.message });
    }
}
