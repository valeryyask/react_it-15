// src/components/AgentsTable.jsx — ТАБЛИЦА НА БИБЛИОТЕКЕ TanStack Table (@tanstack/react-table).
// Поддерживает сортировку по клику на заголовок, глобальный поиск и пагинацию.

import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DeleteAgentButton from "./DeleteAgentButton";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", { header: "ID" }),
  columnHelper.accessor("name", { header: "Риелтор" }),
  columnHelper.accessor("agency", { header: "Агентство" }),
  columnHelper.accessor("city", { header: "Город" }),
  columnHelper.accessor("phone", { header: "Телефон" }),
  columnHelper.accessor("email", { header: "Email" }),
  columnHelper.display({
    id: "actions",
    header: "",
    enableSorting: false,
    cell: ({ row }) => <DeleteAgentButton id={row.original.id} />,
  }),
];

export default function AgentsTable({ data }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  const rows = table.getRowModel().rows;

  return (
    <div>
      {/* Поле поиска по всем колонкам */}
      <div className="toolbar">
        <input
          placeholder="Поиск по риелторам..."
          value={globalFilter}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sorted = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    className={header.column.getCanSort() ? "sortable" : ""}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {sorted === "asc" && " ▲"}
                    {sorted === "desc" && " ▼"}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="empty">
                Ничего не найдено
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Постраничная навигация */}
      <div className="pagination">
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          «
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          ‹
        </button>
        <span>
          Страница {table.getState().pagination.pageIndex + 1} из{" "}
          {Math.max(table.getPageCount(), 1)}
        </span>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          ›
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          »
        </button>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              {size} на странице
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
