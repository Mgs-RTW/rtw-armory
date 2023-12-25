"use client";
import {
  CommanderForm,
  CreateCommanderAssets,
} from "@/app/admin/components/Commander/CommanderForm";
import { useCommanderQuery } from "@/domain/commander";
import { useCreateCommanderMutation } from "@/domain/commander";
import { useSearchParams } from "next/navigation";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ApiCommander } from "@lotr-rtw/service-types";

export default function Commander() {
  const params = useSearchParams();
  const router = useRouter();
  const commanderId = params.get("id");
  const { data: commander } = useCommanderQuery(commanderId);
  const { mutateAsync, error } = useCreateCommanderMutation();

  const handleSubmit = (
    formdata: FormData,
    assets: CreateCommanderAssets | undefined
  ) => {
    const body = Object.fromEntries(formdata);

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
      onSubmit={handleSubmit}
      commander={commander}
      onCancel={() => router.push("/admin")}
    />
  );
}
