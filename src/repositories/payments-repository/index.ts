import { prisma } from "@/config";

async function getPaymentsById(ticketId: number) {
  return prisma.payment.findMany(
    {
      where: {
        ticketId
      }
    }
  );
}

const paymentsRepository = {
  getPaymentsById,
};
  
export default paymentsRepository;
