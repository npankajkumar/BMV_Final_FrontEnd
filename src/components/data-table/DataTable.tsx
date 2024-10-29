"use client";

import VenuePageHeader from "@/components/VenuePageHeader";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowUpDown, Check, ChevronsUpDown, Star } from "lucide-react";
import { z } from "zod";
import React, { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { availableSlots, categories } from "@/db";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoadingButton from "@/components/LoadingButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useBmv } from "@/contexts/bmvContext";
import NotFound from "@/components/NotFound";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "../ui/button";

interface DataTableProps {
  updateProvider: any;
  data: Slot[];
}

function convertTime(time: string): string {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const period = hours >= 12 ? "P.M." : "A.M.";
  const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for 12 A.M.
  return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export const columns: ColumnDef<Slot>[] = [
  {
    accessorKey: "from",
    header: "Start Time",
    cell: ({ row }) => {
      const from = row.original.from;
      return <div className="text-center">{convertTime(from)}</div>;
    },
  },
  {
    accessorKey: "to",
    header: "End Time",
    cell: ({ row }) => {
      const to = row.original.to;
      return <div className="text-center">{convertTime(to)}</div>;
    },
  },
  {
    accessorKey: "weekdayPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Weekday Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.original.weekdayPrice;

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="text-center font-medium ">{formatted}</div>;
    },
  },
  {
    accessorKey: "weekendPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Weekend Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      console.log(row.original);
      const amount = row.original.weekendPrice;

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="text-center right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
      console.log(row.original);
      return (
        <EditButton
          updateProvider={updateProvider}
          slotId={parseInt(row.original.id)}
          status={row.original.status}
          weekdayPrice={row.original.weekdayPrice}
          weekendPrice={row.original.weekendPrice}
        />
      );
    },
  },
];

export type Slot = {
  id: string;
  weekdayPrice: number;
  weekendPrice: number;
  status: "available" | "blocked";
  from: string;
  to: string;
};

export function DataTable<Slot>({ updateProvider, data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<Slot, any>[] = [
    {
      accessorKey: "from",
      header: ({ h }) => <div className="text-center">Start Time</div>,
      cell: ({ row }) => {
        const from = row.original.from;
        return <div className="text-center">{convertTime(from)}</div>;
      },
    },
    {
      accessorKey: "to",
      header: ({ h }) => <div className="text-center">End Time</div>,
      cell: ({ row }) => {
        const to = row.original.to;
        return <div className="text-center">{convertTime(to)}</div>;
      },
    },
    {
      accessorKey: "weekdayPrice",
      header: ({ column }) => {
        return (
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Weekday Price
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const amount = row.original.weekdayPrice;

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "INR",
        }).format(amount);

        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "weekendPrice",
      header: ({ column }) => {
        return (
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Weekend Price
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        console.log(row.original);
        const amount = row.original.weekendPrice;

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "INR",
        }).format(amount);

        return <div className="text-center right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "status",
      header: () => {
        return <div className="text-center">Status</div>;
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.original.status}</div>;
      },
    },
    {
      id: "edit",
      enableHiding: false,
      cell: ({ row }) => {
        console.log(row.original);
        return (
          <EditButton
            updateProvider={updateProvider}
            slotId={parseInt(row.original.id)}
            status={row.original.status}
            weekdayPrice={row.original.weekdayPrice}
            weekendPrice={row.original.weekendPrice}
          />
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
      sorting,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center space-x-2 py-4">
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
  );
}
const FormSchema = z.object({
  status: z.string(),
  weekdayPrice: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0 && val <= 999999999, {
      message: "Weekday price must be between 0 and 999999999.",
    }),
  weekendPrice: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0 && val <= 999999999, {
      message: "Weekend price must be between 0 and 999999999.",
    }),
});
const EditButton = ({
  updateProvider,
  slotId,
  status,
  weekdayPrice,
  weekendPrice,
}: {
  updateProvider: any;
  slotId: number;
  status: string;
  weekdayPrice: number;
  weekendPrice: number;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: status,
      weekdayPrice: weekdayPrice.toString(),
      weekendPrice: weekendPrice.toString(),
    },
  });

  const [slotEditLoading, setSlotEditLoading] = useState<boolean>(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setSlotEditLoading(true);
    // setTimeout(() => {}, 2000);
    axios
      .put(`http://localhost:5059/api/Slot/${slotId}`, {
        isBlocked: data.status == "blocked",
        weekdayPrice: data.weekdayPrice,
        weekendPrice: data.weekendPrice,
      })
      .then((res) => {
        setSlotEditLoading(false);
        updateProvider();
        toast({ title: "Slot Edited" });
      })
      .catch((err) => {
        toast({ title: "Error occurred", description: err });
        setSlotEditLoading(false);
      });
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">
    //         {JSON.stringify(data, null, 2)}
    //         <div>{data.status == "blocked" ? "true" : "false"}</div>
    //       </code>
    //     </pre>
    //   ),
    // });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Slot</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md ">
        <DialogHeader>
          <DialogTitle>Edit Venue</DialogTitle>
          <DialogDescription>
            Make changes to slot here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="weekdayPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weekday Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weekendPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weekend Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 justify-around">
              <LoadingButton type="submit" loading={slotEditLoading}>
                Save
              </LoadingButton>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
