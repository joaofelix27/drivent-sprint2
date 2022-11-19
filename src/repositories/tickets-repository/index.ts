import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function getTickets() {
  return prisma.ticket.findMany();
}

const ticketsRepository = {
  getTickets,
};

export default ticketsRepository;
