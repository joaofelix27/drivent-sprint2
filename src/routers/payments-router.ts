import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPaymentsByTicketId } from "@/controllers/payments-controller";

const paymentsRouter = Router ();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentsByTicketId);

export { paymentsRouter };

