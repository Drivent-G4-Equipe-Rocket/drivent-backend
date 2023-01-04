import { ApplicationError } from "@/protocols";

export function cannotListActivitiesError(): ApplicationError {
  console.log("entrou na funcao cannotListActivitiesError");
  return {
    name: "cannotListActivitiesError",
    message: "Cannot list activities!",
  };
}
