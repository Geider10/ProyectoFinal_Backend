import {ticketModel} from '../schema/ticket.model.js'; 

export class TicketDao {
    async addTicket(ticket){
        await ticketModel.create(ticket)
    }
}