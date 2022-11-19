import { AuthenticatedRequest } from "@/middlewares";
import { CreateTicket } from "@/protocols";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const tickets = await ticketsService.getTickets(userId);
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const tickets = await ticketsService.getTicketsTypes();
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body as CreateTicket;

  if (!ticketTypeId) return res.status(httpStatus.BAD_REQUEST).send({});

  try {
    const tickets = await ticketsService.createTicket( ticketTypeId, userId);
    return res.status(httpStatus.CREATED).send(tickets);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

