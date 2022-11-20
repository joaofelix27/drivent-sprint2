import { prisma } from "@/config";
import { CreatePayment } from "@/protocols";
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

async function createPayment(paymentData: CreatePayment, value: number):  Promise<Payment> {
  const { cardData } = paymentData;
  const last4Number = String(cardData?.number).slice(-4); 
  return prisma.payment.create  ({
    data: {
      cardIssuer: cardData.issuer,
      ticketId: paymentData.ticketId,
      value,
      cardLastDigits: last4Number
    }
  });
}

const paymentsRepository = {
  getPaymentsById,
  createPayment
};
  
export default paymentsRepository;
