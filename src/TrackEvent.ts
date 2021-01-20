import firebase from "firebase/app";
import "firebase/analytics";

export function RecordEvent(
  eventName: string,
  eventBody: { [parameterName: string]: string }
) {
  firebase.analytics().logEvent(eventName, {
    app_name: "Longwave",
    screen_name: "index",
    ...eventBody,
  });
}
