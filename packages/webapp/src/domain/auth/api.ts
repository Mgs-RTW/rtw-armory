import { client } from "@/util";
import { ApiUser, Credentials } from "@lotr-rtw/service-types";

export function signInUser(credentials: Credentials) {
  return client.post<ApiUser>("/login", credentials);
}

export function signUpUser(credentials: Credentials) {
  return client.post<ApiUser>("/register", credentials);
}

export function signOutUser() {
  return client.post("/logout");
}
