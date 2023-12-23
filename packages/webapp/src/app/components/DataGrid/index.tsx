"use client";
import { ApiCommander, ApiGear } from "@lotr-rtw/service-types";
import styles from "./index.module.scss";
import { MdModeEdit, MdDelete, MdAddCircleOutline } from "react-icons/md";

interface GridColumn {
  label: string;
  width: number;
  data: string;
  isImage: boolean;
  id: string;
}

interface Props {
  columns: GridColumn[];
  data: ApiCommander[] | ApiGear[];
  height: number;
  caller: string;
  loadEditForm(data: ApiCommander | ApiGear): void;
  deleteRow(data: ApiCommander | ApiGear): void;
  loadCreateForm(): void;
}

const Row = ({ children }: any) => {
  return (
    <div className={`${styles.TableRow}`}>
      <div className={styles.TableRowWrapper}>{children}</div>
    </div>
  );
};

const Column = ({ width, children, isImage }: any) => (
  <div className={styles.TableColumn} style={{ width }}>
    {isImage ? (
      <img key={children} className={styles.AvatarImage} src={children} />
    ) : (
      children
    )}
  </div>
);

const HeaderColumn = ({ width, children }: any) => (
  <div className={styles.TableRowHeader} style={{ width }}>
    {children}
  </div>
);

interface ActionButton {
  icon: JSX.Element;
  confirm: boolean;
  action(data: ApiCommander | ApiGear, props: Props): void;
}

const actionButtons: ActionButton[] = [
  {
    icon: (
      <MdModeEdit color="green" className={styles.ActionButton}></MdModeEdit>
    ),
    confirm: false,
    action: (data, props) => {
      props.loadEditForm(data);
    },
  },
  {
    icon: <MdDelete color="darkred" className={styles.ActionButton}></MdDelete>,
    confirm: true,
    action: (data, props) => {
      if (confirm(`Are you sure you want to delete ${data.name}?`)) {
        props.deleteRow(data);
      } else {
      }
    },
  },
];

function determineIfImage(data: string) {
  return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(data);
}

export const DataGrid = (props: Props) => {
  const { columns, data, height, caller, loadCreateForm } = props;

  return (
    <div className={styles.DataGrid} style={{ height, overflowY: "scroll" }}>
      {
        <Row key={`header_row_${caller}`} header>
          {columns.map((column: GridColumn, index: number) => (
            <HeaderColumn
              key={`header_column_row_${caller}_${index}`}
              width={column.width}
            >
              {column.label}
            </HeaderColumn>
          ))}
        </Row>
      }
      {data.map((row: ApiCommander | ApiGear, index: number) => {
        let dataToUse: GridColumn[] = [];
        Object.keys(row).map((key) => {
          [];
          const foundInColumns = columns.find((X) => X.label == key);
          let data = row[key];
          if (foundInColumns) {
            dataToUse.push({
              id: foundInColumns.id,
              label: foundInColumns.label,
              data,
              width: foundInColumns.width,
              isImage: determineIfImage(data),
            });
          }
        });

        const nestedColumns = columns.filter((column) =>
          column.id.includes(".")
        );
        for (const column of nestedColumns) {
          let splitOnStr = column.id.split(".");
          let data = row[splitOnStr[0]][splitOnStr[1]];
          if (
            splitOnStr.length > 1 &&
            row[splitOnStr[0]][splitOnStr[1]] !== undefined
          ) {
            dataToUse.push({
              id: column.id,
              label: column.label,
              data,
              width: column.width,
              isImage: determineIfImage(data),
            });
          }
        }

        return (
          <Row key={`row_${caller}_${index}`}>
            {dataToUse.map((data, index) => {
              return (
                <Column
                  key={`row_column_${caller}_${index}`}
                  data={data}
                  width={data?.width}
                  isImage={data?.isImage}
                >
                  {data?.data}
                </Column>
              );
            })}
            {actionButtons.map((data, index) => {
              return (
                <div
                  key={`row_column_${caller}_action_button_${index}`}
                  onClick={() => {
                    data.action(row, props);
                  }}
                >
                  <Column data={data} width={60} isImage={false}>
                    {data.icon}
                  </Column>
                </div>
              );
            })}
          </Row>
        );
      })}
      <MdAddCircleOutline
        color="green"
        className={styles.ButtonAddNew}
        onClick={loadCreateForm}
      ></MdAddCircleOutline>
    </div>
  );
};
