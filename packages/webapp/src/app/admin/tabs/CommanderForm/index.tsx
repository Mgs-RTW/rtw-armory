"use client";
import { FormEvent } from "react";
import { CreateCommanderBody } from "@lotr-rtw/service-types";
import { RaceDropdown } from "@/components";

export const CommanderForm = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {};

  return (
    <form onSubmit={handleSubmit}>
      <RaceDropdown fullWidth />
      <input name="name" />
    </form>
  );
};
