import { prisma } from "@/config";
import { EnrollmentWithTicketsAndType, TicketWithEnrollment } from "@/protocols";
import { Ticket, TicketType } from "@prisma/client";

async function getTickets(userId: number): Promise<EnrollmentWithTicketsAndType>  {
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

async function getTicketTypeByTypeId(ticketId: number) {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId
    }, include: {
      TicketType: true
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

async function updateTicket(ticketId: number):  Promise<Ticket> {
  return prisma.ticket.update  ({
    where: { 
      id: ticketId
    },
    data: {
      status: "PAID"
    },
  });
}

const ticketsRepository = {
  getTickets,
  getTicketsById,
  getTicketTypeByTypeId,
  getTicketsTypes,
  createTicket,
  updateTicket
};

export default ticketsRepository;
