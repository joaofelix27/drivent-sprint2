import { Router } from "express";
import { createTicket, getTickets, getTicketsTypes } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const ticketsRouter = Router ();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .get("/types", getTicketsTypes)
  .post("/", createTicket);

export { ticketsRouter };

