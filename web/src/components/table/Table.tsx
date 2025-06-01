/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from "react";
import "./table.css";

type Header = string | ReactElement;
type Column<T> = (value: T) => undefined | string | number | ReactElement;

export type TableColumn<T> = {
  header: Header;
  column: Column<T>;
  align?: "left" | "right" | "center";
  onClick?: (value: T) => void;
};

type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  keyExtractor: (value: T) => number | string | undefined;
  onClickRow?: (value: T) => void;
};

export function Table<T>({
  data,
  columns,
  keyExtractor,
  onClickRow,
}: TableProps<T>): ReactElement {
  const renderHeader = (column: TableColumn<T>, index: number) => {
    return (
      <th key={`${column.header}-${index}`} style={{ textAlign: column.align }}>
        {column.header}
      </th>
    );
  };

  const renderColumns = (data: any) => {
    return (
      <tr
        key={`row-${keyExtractor(data)}`}
        onClick={() => onClickRow?.(data)}
        className={onClickRow ? "clickable" : ""}
      >
        {columns.map((column, index) => renderColumn(column, data, index))}
      </tr>
    );
  };

  const renderColumn = (column: TableColumn<T>, data: T, index: number) => {
    return (
      <td
        key={`${column.header}-${keyExtractor(data)}-${index}`}
        style={{ textAlign: column.align }}
        className={column.onClick ? "clickable" : ""}
        onClick={() => column.onClick?.(data)}
      >
        {column.column(data)}
      </td>
    );
  };

  return (
    <table className="atlas-table">
      <thead>
        <tr>{columns.map((column, index) => renderHeader(column, index))}</tr>
      </thead>
      <tbody>{data.map((value) => renderColumns(value))}</tbody>
    </table>
  );
}
