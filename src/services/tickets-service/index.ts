import { notFoundError } from "@/errors";
import { EnrollmentWithTicketsAndType } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTickets(userId: number) {
  const tickets = await ticketsRepository.getTickets(userId);
  if (!tickets?.Ticket[0]) throw notFoundError();

  return tickets?.Ticket[0];
}

async function getTicketsTypes() {
  const tickets = await ticketsRepository.getTicketsTypes();
  if (!tickets) throw notFoundError();

  return tickets;
}

async function createTicket(ticketTypeId: number, userId: number) {
  const enrollmentExists = await enrollmentRepository.findByUserId(userId);

  if (!enrollmentExists) throw notFoundError();

  await ticketsRepository.createTicket(ticketTypeId, enrollmentExists?.id );

  return getTickets(userId);

  // Only works if there is only one ticket from an user
}

const ticketsService = { getTickets, getTicketsTypes, createTicket };

export default ticketsService;
