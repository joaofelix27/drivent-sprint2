import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { createPayment, getPaymentsByTicketId } from "@/controllers/payments-controller";

const paymentsRouter = Router ();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentsByTicketId)
  .post("/process", createPayment);

export { paymentsRouter };

