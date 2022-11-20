import { notFoundError, unauthorizedError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import paymentsRepository from "@/repositories/payments-repository";
import { Payment } from "@prisma/client";

async function getPayments(ticketId: number, userId: number): Promise<Payment> {
  await checkTicket(ticketId, userId);

  const payment = await paymentsRepository.getPaymentsById(ticketId);

  return payment[0];
}

async function checkTicket(ticketId: number, userId: number): Promise<void> {
  const ticket = await ticketsRepository.getTicketsById(ticketId);
  if (!ticket) throw notFoundError();

  const ticketUserId= ticket?.Enrollment?.userId;

  if (ticketUserId!==userId) {
    throw unauthorizedError();
  }
}

async function createPayment(ticketId: number, userId: number) {
  await checkTicket(ticketId, userId);

  return "teste";
}

const paymentsService = { getPayments, createPayment };

export default paymentsService;
