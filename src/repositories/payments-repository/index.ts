import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function getPaymentsById(ticketId: number): Promise<Payment[]> {
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
