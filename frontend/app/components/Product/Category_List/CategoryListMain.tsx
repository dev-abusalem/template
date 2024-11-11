"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, PencilLine, Trash2 } from "lucide-react";
import { z, ZodType } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { InvmsDeleteModal } from "@/app/libs/Modal/InvmsModal";
import { Failed, Success } from "@/app/globals/ToastMessage/ToastMessage";
import {
  useDeleteProductUnit,
  useUpdateProductUnit,
  useGetProductUnits,
  useGetProductCategories,
  useDeleteProductCategory,
  useUpdateProductCategory,
} from "@/app/services/hooks/useProduct";
import { ProductUnit } from "@/app/types/product.types";
import Loading from "@/app/globals/Loading/Loading";
import InvmsUpdateModal from "@/app/libs/Modal/InvmsUpdateModel";

function CategoryListMain() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Fetch product caregory from API
  const { data, isPending, isError, error } = useGetProductCategories();

  // delete product caregory
  const { mutate: deleteProductUnit } = useDeleteProductCategory();
  const handleDelete = async (id: string) => {
    deleteProductUnit(id, {
      onSuccess: () => {
        Failed({ message: "Product category deleted successfully!" });
        setTimeout(() => {
          window?.location?.reload();
        }, 2000);
      },
      onError: (error: any) => {
        console.log(error);
        Failed({
          message: "Product category deleted failed!",
        });
      },
    });
  };

  // handle update caregory
  const { mutate: updateProductCategory } = useUpdateProductCategory();
  const onUpdateSubmit = (values: any, id: string) => {
    updateProductCategory(
      { data: values, id: id },
      {
        onSuccess: () => {
          Success({ message: "Product category updated successfully!" });
          setTimeout(() => {
            window?.location?.reload();
          }, 2000);
        },
        onError: (error: any) => {
          console.log(error);
          Failed({
            message: "Product category updated failed!",
          });
        },
      }
    );
  };

  const columns: ColumnDef<ProductUnit>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div>{row.getValue("status")}</div>,
    },
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        const rowData = row.original;
        const categoryId = rowData._id;
        const schema = z.object({
          name: z.string().min(2, "Name must be at least 2 characters."),
          status: z.enum(["Active", "Inactive"]),
        });

        return (
          <div className="flex justify-start items-center gap-2">
            <InvmsUpdateModal
              onSubmit={(values) => {
                if (categoryId) onUpdateSubmit(values, categoryId);
              }}
              title="Update unit information"
              schema={schema}
              defaultValues={{ name: rowData.name, status: rowData.status }}
            >
              <PencilLine className="text-primary w-5 h-5 cursor-pointer" />
            </InvmsUpdateModal>
            <InvmsDeleteModal
              onClick={() => {
                if (row?.original?._id) {
                  handleDelete(row?.original?._id);
                }
              }}
            >
              <Trash2 className="text-red-500 w-5 h-5 cursor-pointer" />
            </InvmsDeleteModal>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: (data || []) as ProductUnit[],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="mt-2 mb-6 px-4">
      {isPending ? (
        <Loading />
      ) : (
        <div className="mx-auto max-w-6xl shadow-lg p-8 relative bg-white rounded-md">
          <h2 className="text-xl text-gray-800 font-bold">
            Product Category List
          </h2>

          {isError && <p>Error fetching product category: {error?.message}</p>}
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter by name..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Product Category Columns{" "}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryListMain;
