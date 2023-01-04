import activityRepository from "@/repositories/activity-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError, cannotListActivitiesError } from "@/errors";

async function listActivities(userId: number) {
  console.log("entrou em listActivities");
  //Tem enrollment?
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    console.log("entrou no if do enrolment");
    throw notFoundError();
  }
  //Tem ticket pago isOnline false e includesHotel true
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel ) {
    console.log("entrou no if do ticket");
    throw cannotListActivitiesError();
  }
}

async function getActivities(userId: number) {
  listActivities(userId);

  const activities = await activityRepository.findActivities();
  return activities;
}

async function getDates(userId: number) {
  listActivities(userId);

  const activitiesDates = await activityRepository.findActivitiesDates();
  const dates = [...new Set(activitiesDates)];

  return dates;
}

const activityService = {
  getActivities,
  getDates
};

export default activityService;
