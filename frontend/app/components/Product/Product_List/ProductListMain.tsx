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
import { ArrowUpDown, ChevronDown, PencilLine, Trash2 } from "lucide-react";

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
import {
  useDeleteCustomer,
  useGetCustomers,
} from "@/app/services/hooks/useCustomer";
import { CustomerCredentials } from "@/app/types/customer.types";
import { useState } from "react";
import { InvmsDeleteModal } from "@/app/libs/Modal/InvmsModal";
import Link from "next/link";
import { Failed, Success } from "@/app/globals/ToastMessage/ToastMessage";
import {
  useDeleteProduct,
  useGetProducts,
} from "@/app/services/hooks/useProduct";
import { ProductCredentials } from "@/app/types/product.types";
import Image from "next/image";
import placeholder from "@/public/images/placeholder.webp";
function ProductListMain() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  // Fetch customers from API using the useGetCustomers hook
  const { data, isPending, isError, error } = useGetProducts();

  // delete product
  const { mutate: deleteProduct } = useDeleteProduct();
  const handleDelete = async (id: string) => {
    deleteProduct(id, {
      onSuccess: () => {
        Failed({ message: "Product deleted successfully!" });
        setTimeout(() => {
          window?.location?.reload();
        }, 2000);
      },
      onError: (error) => {
        console.log(error);
        Failed({
          message: "Product deleted failed!",
        });
      },
    });
  };

  const columns: ColumnDef<ProductCredentials>[] = [
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
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="px-4">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "serialNumber",
      header: "Serial No.",
      cell: ({ row }) => <div>{row.getValue("serialNumber")}</div>,
    },
    {
      accessorKey: "salePrice",
      header: "Price",
      cell: ({ row }) => <div>{row.getValue("salePrice")}</div>,
    },
    {
      accessorKey: "vatPercentage",
      header: "VAT",
      cell: ({ row }) => <div>{row.getValue("vatPercentage")}%</div>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const cate = row?.original?.category as any;
        return <div>{cate?.name ? cate?.name : "No category"}</div>;
      },
    },
    {
      accessorKey: "model",
      header: "Model",
      cell: ({ row }) => <div>{row.getValue("model")}</div>,
    },
    {
      accessorKey: "unit",
      header: "Unit",
      cell: ({ row }) => {
        const unit = row?.original?.unit as any;
        return <div>{unit?.name ? unit?.name : "No unit"}</div>;
      },
    },
    {
      accessorKey: "supplier",
      header: "Supplier",
      cell: ({ row }) => {
        const supplier = row?.original?.supplier as any;
        return <div>{supplier?.name ? supplier?.name : "No supplier"}</div>;
      },
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const image = row?.original?.image as any;
        return (
          <div>
            {image ? (
              <Image
                className="w-10 h-10 rounded"
                src={image}
                alt="image"
                width={40}
                height={40}
              />
            ) : (
              <Image
                src={placeholder}
                alt="placeholder"
                width={40}
                height={40}
                className="w-10 h-10 rounded"
              />
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <Link href={`/product/edit-product/${row?.original?._id}`}>
            <PencilLine className="text-primary w-5 h-5 cursor-pointer" />
          </Link>
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
      ),
    },
  ];

  const table = useReactTable({
    data: (data || []) as ProductCredentials[],
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
      <div className="mx-auto max-w-6xl shadow-lg p-8 relative bg-white rounded-md">
        <h2 className="text-xl text-gray-800 font-bold">Product List</h2>
        {isPending && <p>Loading products...</p>}
        {isError && <p>Error fetching products: {error?.message}</p>}
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Product Columns <ChevronDown className="ml-2 h-4 w-4" />
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
    </div>
  );
}

export default ProductListMain;
