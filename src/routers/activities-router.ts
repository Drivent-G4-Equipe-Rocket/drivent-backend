import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listActivities, listActivityDates } from "../controllers/activities-controller";

const activityRouter = Router();

activityRouter
  .all("/*", authenticateToken)
  .get("", listActivities)
  .get("/:dates", listActivityDates);

export { activityRouter }; 
