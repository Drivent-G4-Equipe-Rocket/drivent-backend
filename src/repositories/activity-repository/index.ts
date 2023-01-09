import { prisma } from "@/config";
import { Activity, Schedule } from "@prisma/client";
import { SendHandle } from "child_process";

async function findActivities() {
  return prisma.activity.findMany();
}

async function findActivitiesDates() {
  return prisma.activity.findMany({
    select: { date: true }
  });  
}

type CreateParams = Omit<Schedule, "id" | "createdAt" | "updatedAt">;

async function createSchedule({ userId, activityId }: CreateParams): Promise<Schedule> {
  return prisma.schedule.create({
    data: {
      userId,
      activityId,
    }
  });
}

const activityRepository = {
  findActivities,
  findActivitiesDates,
  createSchedule
};

export default activityRepository;
