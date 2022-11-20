import { notFoundError, unauthorizedError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import paymentsRepository from "@/repositories/payments-repository";
import { Payment } from "@prisma/client";
import { CreatePayment } from "@/protocols";

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

async function getValue(ticketId: number): Promise<number> {
  const ticket =  await ticketsRepository.getTicketTypeByTypeId (ticketId);

  const ticketValue = ticket?.TicketType?.price;

  return ticketValue;
}

async function createPayment(paymentData: CreatePayment, userId: number) {
  const ticketId = paymentData.ticketId;
  await checkTicket(ticketId, userId);

  const ticketValue = await getValue (ticketId);

  const createdPayment = await paymentsRepository.createPayment(paymentData, ticketValue);

  await ticketsRepository.updateTicket(ticketId);

  return createdPayment;
}

const paymentsService = { getPayments, createPayment };

export default paymentsService;
