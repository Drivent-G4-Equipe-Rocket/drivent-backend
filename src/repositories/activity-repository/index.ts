import { prisma } from "@/config";
import { Activity } from "@prisma/client";

async function findActivities() {
  return prisma.activity.findMany();
}

const activityRepository = {
  findActivities
};

export default activityRepository;
