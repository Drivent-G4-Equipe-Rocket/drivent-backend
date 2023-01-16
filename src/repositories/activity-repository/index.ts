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

async function findSchedules(userId: number) {
  return prisma.schedule.findMany({
    where: { userId }
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

async function updateActivitiy(activityId: number) {
  return prisma.activity.update({
    where: {
      id: activityId
    },
    data: {
      vacancies: { decrement: 1 }
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
  findSchedules,
  createSchedule,
  updateActivitiy,
  findSchedule
};

export default activityRepository;
