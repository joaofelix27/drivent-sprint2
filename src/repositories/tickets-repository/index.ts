import { prisma } from "@/config";
import { Prisma, Ticket } from "@prisma/client";

async function getTickets(userId: number) {
  return prisma.enrollment.findUnique({
    where: {
      userId
    }, include: {
      Ticket: {
        include: {
          TicketType: true
        }
      },
    }
   
  });
}

async function getTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create  ({
    data: {
      ticketTypeId,
      enrollmentId,
      status: "RESERVED"
    },
  });
}

const ticketsRepository = {
  getTickets,
  getTicketsTypes,
  createTicket
};

export default ticketsRepository;
