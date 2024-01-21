import { MdDelete } from "react-icons/md";

import styles from "./DeleteCommanderModal.module.scss";

interface Props {
  commanderId: string;
  commanderName: string;
}

export const DeleteCommanderModal = (props: Props) => {
  const handleConfirm = (props: Props) => {
    if (confirm(`Are you sure you want to delete ${props.commanderName}?`)) {
    } else {
    }
  };

  return (
    <MdDelete
      className={styles.DeleteButton}
      onClick={() => handleConfirm(props)}
      color="darkred"
    ></MdDelete>
  );
};
