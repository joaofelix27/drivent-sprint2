import { notFoundError, unauthorizedError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import paymentsRepository from "@/repositories/payments-repository";

async function getPayments(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.getTicketsById(ticketId);
  if (!ticket) throw notFoundError();

  const ticketUserId= ticket?.Enrollment?.userId;

  if (ticketUserId!==userId) {
    throw unauthorizedError();
  }

  const payment = await paymentsRepository.getPaymentsById(ticketId);

  return payment[0];
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
