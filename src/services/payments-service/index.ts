import { notFoundError, unauthorizedError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";

async function getPayments(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.getTicketsById(ticketId);
  if (!ticket) throw notFoundError();

  const ticketUserId= ticket?.Enrollment?.userId;

  if (ticketUserId!==userId) {
    throw unauthorizedError();
  }

  return ticket;
}

// async function createTicket(ticketTypeId: number, userId: number) {
//   const enrollmentExists = await enrollmentRepository.findByUserId(userId);

//   if (!enrollmentExists) throw notFoundError();

//   await paymentsRepository.createTicket(ticketTypeId, enrollmentExists?.id );

//   return getTickets(userId);

//   // Only works if there is only one ticket from an user
// }

const paymentsService = { getPayments };

export default paymentsService;
