"use client";
import { CommanderForm } from "@/app/admin/components/Commander/CommanderForm";
import { useCommanderQuery } from "@/domain/commander";
import { useCreateCommanderMutation } from "@/domain/commander";
import { useSearchParams } from "next/navigation";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Commander() {
  const params = useSearchParams();
  const router = useRouter();
  const commanderId = params.get("id");
  const { data: commander } = useCommanderQuery(commanderId);
  const { mutateAsync, error } = useCreateCommanderMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.currentTarget));

    const transformed = Object.entries(body).reduce((acc, [key, value]) => {
      if (key.includes(".")) {
        const [head, tail] = key.split(".");
        acc.append(`${head}[${tail}]`, value);
      } else {
        acc.append(key, value);
      }
      return acc;
    }, new FormData());

    mutateAsync(transformed).then(console.log).catch(console.error);
  };

  return (
    <CommanderForm
      submit={handleSubmit}
      commander={commander}
      cancel={() => router.push("/admin")}
    />
  );
}
