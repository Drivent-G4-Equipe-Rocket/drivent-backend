import { prisma } from "@/config";
import { Activity, Schedule } from "@prisma/client";
import { SendHandle } from "child_process";

async function findActivities() {
  return prisma.activity.findMany();
}

async function findActivity(activityId: number) {
  return prisma.activity.findUnique({
    where: { id: activityId }
  });
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

async function findSchedule(userId: number, activityId: number) {
  return prisma.schedule.findFirst({
    where: {
      userId,
      activityId
    }
  });
}

const activityRepository = {
  findActivities,
  findActivity,
  findActivitiesDates,
  createSchedule,
  findSchedule
};

export default activityRepository;
