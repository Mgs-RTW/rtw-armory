interface Props {
  columns: string[];
  children: JSX.Element[];
  className: string;
}

export const Table = ({ columns, children, className }: Props) => (
  <table className={className}>
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col}>{col}</th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);
