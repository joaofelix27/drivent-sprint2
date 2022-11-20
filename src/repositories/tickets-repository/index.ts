import { prisma } from "@/config";
import { TicketWithEnrollment } from "@/protocols";
import { Enrollment, Ticket, TicketType } from "@prisma/client";

async function getTickets(userId: number): Promise<Enrollment> {
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

async function getTicketsById(ticketId: number): Promise<TicketWithEnrollment> {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId
    }, include: {
      Enrollment: true
    }
  });
}

async function getTicketsTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function createTicket(ticketTypeId: number, enrollmentId: number):  Promise<Ticket> {
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
