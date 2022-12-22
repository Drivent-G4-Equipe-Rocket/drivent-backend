import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketTypes, getTickets, createTicket, getTicketPaid } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("", getTickets)
  .get("/paid", getTicketPaid)
  .post("", createTicket);

export { ticketsRouter };
