import { prisma } from "@/config";
import { Activity } from "@prisma/client";

async function findActivities() {
  return prisma.activity.findMany();
}

async function findActivitiesDates() {
  return prisma.activity.findMany({
    select: { date: true }
  });  
}

const activityRepository = {
  findActivities,
  findActivitiesDates
};

export default activityRepository;
