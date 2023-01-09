import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { findHotelsWithRooms, getHotels, getHotelsWithRooms } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", findHotelsWithRooms)
  .get("/:hotelId", getHotelsWithRooms);

export { hotelsRouter };
