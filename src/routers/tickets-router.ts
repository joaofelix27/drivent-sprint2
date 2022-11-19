import { Router } from "express";
import { getTickets, getTicketsTypes } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const ticketsRouter = Router ();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .get("/types", getTicketsTypes);

export { ticketsRouter };

