import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTickets(userId: number) {
  const tickets = await ticketsRepository.getTickets(userId);
  if (!tickets?.Ticket[0]) throw notFoundError();

  return tickets?.Ticket[0];
}

const ticketsService = { getTickets };

export default ticketsService;
