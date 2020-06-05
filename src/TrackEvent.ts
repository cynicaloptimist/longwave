import { analytics } from "firebase";

export function RecordEvent(
  eventName: string,
  eventBody: { [parameterName: string]: string }
) {
  analytics().logEvent(eventName, {
    app_name: "Longwave",
    screen_name: "index",
    ...eventBody,
  });
}
