"use client";

import * as React from "react";
import { add, format, set } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface componentsProps {
  className?: string;
  fromDate?: Date;
  toDate?: Date;
  date: Date;
  handleDateChange: (date: Date | undefined) => void;
  setDate?: React.Dispatch<React.SetStateAction<Date>>;
}

export function ConditionalDatePicker({
  className,
  fromDate,
  toDate,
  date,
  handleDateChange,
}: componentsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"w-auto p-0" + className}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          disabled={(date) => {
            if (fromDate && date < add(fromDate, { days: -1 })) {
              return true;
            }
            if (toDate && date > add(toDate, { days: -1 })) return true;
            return false;
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
