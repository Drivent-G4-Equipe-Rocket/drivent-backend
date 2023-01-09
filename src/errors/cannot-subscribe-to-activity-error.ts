import { ApplicationError } from "@/protocols";

export function cannotSubscribeToActivityError(): ApplicationError {
  return {
    name: "cannotSubscribeToActivityError",
    message: "Cannot subscribe to this activity!",
  };
}
