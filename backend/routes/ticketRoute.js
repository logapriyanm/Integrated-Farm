import express from 'express';
import { bookTicket, getAllTickets, approveTicket, cancelTicket } from '../controllers/ticketController.js';
import adminAuth from '../middleware/adminAuth.js';
import { authUser } from '../middleware/auth.js';

const ticketRouter = express.Router();

ticketRouter.post('/book', authUser, bookTicket);
ticketRouter.get('/list', adminAuth, getAllTickets); 
ticketRouter.post('/approve', adminAuth, approveTicket);
ticketRouter.post('/cancel', adminAuth, cancelTicket);

export default ticketRouter;
