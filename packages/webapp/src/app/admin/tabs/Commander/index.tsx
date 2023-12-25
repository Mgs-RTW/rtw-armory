import { useCommandersQuery } from "@/domain/commander";
import Link from "next/link";
import { Avatar } from "@/app/components/Avatar/Avatar";
import { Table } from "@/app/components/Table/Table";
import { MdAddCircleOutline } from "react-icons/md";
import styles from "./commander-tab.module.scss";

export const Commander = () => {
  const { data: commanders } = useCommandersQuery();

  if (!commanders) return null;

  return (
    <>
      <Table className={styles.CommanderTable} columns={["", "Name"]}>
        {commanders.map((commander) => (
          <tr key={commander.id}>
            <td>
              <Avatar alt={commander.name} src={commander.assets.avatarUrl} />
            </td>
            <td>
              <Link href={`/admin/commander?id=${commander.id}`}>
                <span className={styles.CommanderName}>{commander.name}</span>
              </Link>
            </td>
          </tr>
        ))}
      </Table>
      <Link href={`/admin/commander`}>
        <MdAddCircleOutline
          color="green"
          className={styles.ButtonAddNew}
        ></MdAddCircleOutline>
      </Link>
    </>
  );
};
