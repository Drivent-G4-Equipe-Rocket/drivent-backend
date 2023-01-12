import activityRepository from "@/repositories/activity-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError, cannotListActivitiesError, cannotSubscribeToActivityError } from "@/errors";

async function listActivities(userId: number) {
  //Tem enrollment?
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  //Tem ticket pago isOnline false e includesHotel true
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote ) {
    throw cannotListActivitiesError();
  }
}

async function getActivities(userId: number) {
  await listActivities(userId);

  const activities = await activityRepository.findActivities();
  return activities;
}

async function getDates(userId: number) {
  await listActivities(userId);

  const activitiesDates = await activityRepository.findActivitiesDates();
  const dates = [...new Set(activitiesDates)];

  return dates;
}

async function getSchedules(userId: number) {
  await listActivities(userId);

  const schedules = await activityRepository.findSchedules(userId);
  return schedules;
}

async function postActivities(userId: number, activityId: number) {
  await listActivities(userId);
  const activity = await activityRepository.findActivity(activityId);
  if(activity.vacancies <= 0) {
    throw cannotSubscribeToActivityError();
  }

  const schedule = await activityRepository.findSchedule(userId, activityId);
  if(schedule) {
    throw cannotSubscribeToActivityError();
  }
  
  return activityRepository.createSchedule({ userId, activityId });
}

const activityService = {
  getActivities,
  getDates, 
  getSchedules,
  postActivities
};

export default activityService;
