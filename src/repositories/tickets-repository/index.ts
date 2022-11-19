import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

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

// async function getTickets(userIde: number) {
//   return prisma.ticket.findMany({
//     include: {
//       TicketType: true,
//       Enrollment: {
//         include: {
//           User: true
//         }
//       }
//     }
//   });
// }

const ticketsRepository = {
  getTickets,
  getTicketsTypes
};

export default ticketsRepository;
