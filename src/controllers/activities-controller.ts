import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import activityService from "@/services/activities-service";

export async function listActivities(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const activities = await activityService.getActivities(Number(userId));
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "cannotListActivitiesError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function listActivityDates(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const dates = await activityService.getDates(userId);
    return res.status(httpStatus.OK).send(dates);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "cannotListActivitiesError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function writeActivities(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { activityId } = req.body;

  try {
    await activityService.postActivities(userId, activityId);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
