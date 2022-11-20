import { prisma } from "@/config";

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

async function getTicketsById(ticketId: number) {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId
    }, include: {
      Enrollment: true
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
  getTicketsById,
  getTicketsTypes,
  createTicket
};

export default ticketsRepository;
