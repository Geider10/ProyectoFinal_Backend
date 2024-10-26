import persistence from '../models/persistence.js';
const {ticketDao} = persistence

export class TicketService{
    constructor(){
        this.ticket = ticketDao
    }
    async addTicket(ticket){
        try {
            await this.ticket.addTicket(ticket)
        } catch (e) {
            throw new Error(e)
        }
    }
}