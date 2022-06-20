import React, { useState } from "react";
import styles from "@modules/Table.module.scss";
import Checkbox from "@components/Checkbox";
import clsx from "clsx";

export type ColumnConfig<B> = {
  name: string;
  uid: B;
  hideOnMobile?: boolean;
  stretch?: boolean;
};
type TableProps<
  T,
  K extends keyof T = keyof T,
  B extends K | string = K | string
> = {
  columns: ColumnConfig<B>[];
  data: T[];
  primaryKey: K;
  onSelected?: T extends { withSelected: true } ? (item: T) => void : undefined;
  withSelected?: boolean;
  renderCell?: (val: T, columnKey: B) => JSX.Element | string;
};
const Table = <T,>(props: TableProps<T>) => {
  const { columns, primaryKey, data, onSelected, renderCell, withSelected } =
    props;
  const [selectedItems, setSelectedItems] = useState<T[keyof T][]>([]);
  const toggleSelected = (item: T) => {
    setSelectedItems((v) => {
      const exists = v.includes(item[primaryKey]);
      if (exists) {
        return v.filter((i) => i !== item[primaryKey]);
      }
      return [...v, item[primaryKey]];
    });
  };
  const toggleAll = () => {
    if (selectedItems.length === data.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data.map((i) => i[primaryKey]));
    }
  };

  return (
    <table border="0" cellSpacing="0" cellPadding="0" className={styles.table}>
      <thead>
        <tr>
          {withSelected && (
            <th>
              <Checkbox
                onClick={toggleAll}
                checked={
                  data.length === selectedItems.length ||
                  (!!selectedItems.length && "semi")
                }
              />
            </th>
          )}
          {columns.map((val) => (
            <th
              className={clsx(
                val.hideOnMobile && styles.hideOnMobile,
                val.stretch && styles.stretch
              )}
              key={val.name}
            >
              {val.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => {
          const isSelected = selectedItems.includes(item[primaryKey]);
          return (
            <tr
              key={item[primaryKey] as unknown as string}
              onClick={() => {
                onSelected?.(item);
              }}
              className={isSelected ? "selected" : ""}
            >
              {withSelected && (
                <td>
                  <Checkbox
                    onClick={() => toggleSelected(item)}
                    checked={isSelected}
                  />
                </td>
              )}
              {columns.map((k) => {
                const result =
                  renderCell?.(item, k.uid) ?? item[k.uid as keyof T];
                return (
                  <td
                    className={clsx(k.hideOnMobile && styles.hideOnMobile)}
                    key={k.uid as string}
                  >
                    {result as JSX.Element}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
