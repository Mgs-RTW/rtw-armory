interface Props {
  columns: string[];
  children: JSX.Element[];
}

export const Table = ({ columns, children }: Props) => (
  <table>
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
