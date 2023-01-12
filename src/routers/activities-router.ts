import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listActivities, listActivityDates, listSchedules, writeActivities } from "../controllers/activities-controller";

const activityRouter = Router();

activityRouter
  .all("/*", authenticateToken)
  .get("", listActivities)
  .get("/dates", listActivityDates)
  .get("/schedule", listSchedules)
  .post("", writeActivities);

export { activityRouter }; 
