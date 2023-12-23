import { DataGrid } from "@/app/components/DataGrid";
import { CommanderForm } from "./CommanderForm";
import {
  useCommandersQuery,
  useCreateCommanderMutation,
} from "@/domain/commander";
import { ApiCommander } from "@lotr-rtw/service-types";
import { FormEvent, useState } from "react";

enum Mode {
  List,
  Edit,
  Create,
}

export const Commander = () => {
  const { data: commanders } = useCommandersQuery();
  const { mutateAsync, error } = useCreateCommanderMutation();
  const [mode, setMode] = useState<Mode>(Mode.List);
  const [commander, setCommander] = useState<ApiCommander>();

  if (!commanders) return null;

  const columns = [
    { id: "name", label: "name", width: 350, data: "", isImage: false },
    {
      id: "assets.avatarUrl",
      label: "avatar",
      width: 350,
      data: "",
      isImage: true,
    },
  ];

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

  const handleEdit = (commander: ApiCommander) => {
    setMode(Mode.Edit);
    setCommander(commander);
  };

  const handleCreate = () => {
    setMode(Mode.Create);
    setCommander(undefined);
  };

  const handleCancel = () => {
    setMode(Mode.List);
    setCommander(undefined);
  };

  const handleDelete = (data: ApiCommander) => {};

  switch (mode) {
    case Mode.List:
      return (
        <div className="table hover striped">
          <DataGrid
            caller={"commander"}
            height={800}
            columns={columns}
            data={commanders!}
            loadEditForm={handleEdit}
            loadCreateForm={handleCreate}
            deleteRow={handleDelete}
          />
        </div>
      );
    case Mode.Edit:
      return (
        <CommanderForm
          commander={commander!}
          submit={handleSubmit}
          cancel={handleCancel}
        ></CommanderForm>
      );
    case Mode.Create:
      return (
        <CommanderForm          
          submit={handleSubmit}
          cancel={handleCancel}
        ></CommanderForm>
      );
  }
};
