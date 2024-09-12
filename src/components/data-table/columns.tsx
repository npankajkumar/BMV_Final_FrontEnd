"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Input } from "../ui/input";
import { EditButton } from "./DataTable";

export type Slot = {
  id: string;
  weekdayPrice: number;
  weekendPrice: number;
  status: "available" | "blocked";
  from: Date;
  to: Date;
  duration: number;
};

export const columns: ColumnDef<Slot>[] = [
  {
    accessorKey: "from",
    header: "Start Time",
    cell: ({ row }) => {
      const from = row.original.from;
      return (
        <div className="text-center">
          {(from.getHours() > 12 ? from.getHours() - 12 : from.getHours()) +
            ":" +
            (from.getMinutes() > 0 ? from.getMinutes() : "00") +
            " " +
            (from.getHours() > 12 ? "A.M" : "P.M")}
        </div>
      );
    },
  },
  {
    accessorKey: "to",
    header: "End Time",
    cell: ({ row }) => {
      const to = row.original.to;
      return (
        <div className="text-center">
          {(to.getHours() > 12 ? to.getHours() - 12 : to.getHours()) +
            ":" +
            (to.getMinutes() > 0 ? to.getMinutes() : "00") +
            " " +
            (to.getHours() > 12 ? "A.M" : "P.M")}
        </div>
      );
    },
  },
  {
    accessorKey: "duration",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Duration
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("duration") + " hours"}</div>
    ),
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
      console.log(row.original.weekdayPrice);
      return (
        <EditButton
          status={row.original.status}
          weekdayPrice={row.original.weekdayPrice}
          weekendPrice={row.original.weekendPrice}
        />
      );
    },
  },
];
