import { useMutation } from "react-query";
import { signInUser, signOutUser, signUpUser } from "./api";

export function useSignInMutation() {
  return useMutation({
    mutationFn: signInUser,
  });
}

export function useSignUpMutation() {
  return useMutation({
    mutationFn: signUpUser,
  });
}

export function useSignOutMutation() {
  return useMutation({
    mutationFn: signOutUser,
  });
}
