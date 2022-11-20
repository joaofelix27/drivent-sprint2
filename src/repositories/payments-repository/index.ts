import { prisma } from "@/config";

async function getPaymentsById(ticketId: number) {
  return prisma.enrollment.findUnique({
    where: {
      userId: 1
    }, include: {
      Ticket: {
        include: {
          TicketType: true
        }
      },
    }
   
  });
}

const ticketsRepository = {
  getPaymentsById,
};
  
export default ticketsRepository;
