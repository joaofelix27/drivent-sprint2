import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";

export async function getPaymentsByTicketId(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const  { userId }  = req;
  
  if (!ticketId) return res.status(httpStatus.BAD_REQUEST).send({});

  try {
    const payments = await paymentsService.getPayments(Number(ticketId), userId);
    return res.status(httpStatus.OK).send(payments);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send({
        message: error.message });
    }
    
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
  
