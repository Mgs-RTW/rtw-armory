"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { QueryStatus } from "react-query";
import { usePathname, useRouter } from "next/navigation";
import { Credentials } from "@lotr-rtw/service-types";

import { useWindowEvent } from "@/hooks";
import { paths } from "@/util/paths";

import { useCurrentUser } from "../user";

import { useSignInMutation, useSignOutMutation } from "./mutations";

const SKIP_PATHS = [paths.register, paths.login];

interface AuthContext {
  isSignedIn: boolean;
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => Promise<void>;
  status: {
    signIn: QueryStatus;
    signOut: QueryStatus;
  };
}

const Context = createContext<AuthContext | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const pathname = usePathname();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { data: user, isLoading } = useCurrentUser({
    enabled: !SKIP_PATHS.includes(pathname),
  });
  const { mutateAsync: signInUser, status: signInStatus } = useSignInMutation();
  const { mutateAsync: signOutUser, status: signOutStatus } =
    useSignOutMutation();
  const returnUrl = useRef("");
  const router = useRouter();

  useLayoutEffect(() => {
    if (SKIP_PATHS.includes(pathname)) {
      return;
    }

    if (!isLoading && user) {
      setIsSignedIn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, JSON.stringify(user)]);

  useWindowEvent("unAuthenticated", ({ detail }) => {
    returnUrl.current = detail.returnUrl;
    setIsSignedIn(false);

    router.replace("/login");
  });

  const signIn = async (credentials: Credentials) => {
    try {
      await signInUser(credentials);

      setIsSignedIn(true);

      if (returnUrl.current) {
        router.replace(returnUrl.current);
        returnUrl.current = "";
      } else {
        router.replace("/");
      }
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await signOutUser();
      setIsSignedIn(false);
      router.replace("/login");
    } catch (error) {
      throw error;
    }
  };

  return (
    <Context.Provider
      value={{
        isSignedIn,
        status: { signIn: signInStatus, signOut: signOutStatus },
        signIn,
        signOut,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error("Cannot consume auth outside the scope of AuthProvider");
  }
  return ctx;
};
