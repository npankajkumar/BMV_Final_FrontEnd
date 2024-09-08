"use client"

import * as React from "react"
import { add, addDays, endOfMonth, endOfWeek, format, isToday } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent,SelectTrigger, SelectGroup, SelectItem, SelectLabel, SelectValue } from "./ui/select"
import { CardHeader } from "./ui/card"
import { Input } from "./ui/input"
import { DialogClose } from "./ui/dialog"

export function DaysCard({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: add(new Date(),{days:1}),
    to: endOfWeek(new Date()),
  })

  const [repeat, setRepeat] = React.useState<string>("do not repeat");
  const [until, setUntil] = React.useState<string>("end of week");
  const [price, setPrice] = React.useState<string>("");

  return (
    <div>
        <div className={cn("grid gap-2 my-4", className)}>
        <Popover>
            <PopoverTrigger asChild>
            <Button
                id="date"
                variant={"outline"}
                className={cn(
                " justify-start text-left font-normal",
                !date && "text-muted-foreground"
                )}
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                date.to ? (
                    <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                    </>
                ) : (
                    format(date.from, "LLL dd, y")
                )
                ) : (
                <span>Pick a date</span>
                )}
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
            <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                disabled={(date) =>{
                    if(isToday(date) )
                        return false
                    if(date > endOfWeek(new Date()))
                    return true
                return date < new Date() 
                }}
                onSelect={setDate}
                numberOfMonths={1}
            />
            </PopoverContent>
        </Popover>
        </div>
        <div className="grid grid-cols-2 gap-4 my-4">
            <div className=" flex flex-col gap-2 justify-center">
                <p className="font-semibold">{"Repeat"}</p>
                <Select onValueChange={setRepeat} defaultValue={repeat}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select repeat condition" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="do not repeat">do not repeat</SelectItem>
          <SelectItem value="weekly">weekly</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
            </div>
            {repeat && repeat!="do not repeat" && <div className=" flex flex-col gap-2 justify-center">
                <p className="font-semibold">{"Until"}</p>
                <Select onValueChange={setUntil} defaultValue={until}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select until condition" />
                  </SelectTrigger>
                <SelectContent>
                  {["end of month"].map((condition,i)=><SelectItem key={i} value={condition}>{condition}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>}
        </div>
        <div>
            <Input value={price} onChange={(e)=>{setPrice(e.target.value)}} type="number" placeholder="Set price of slot"/>
        </div>
        <div className="flex justify-around gap-4 mt-4">
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={()=>{console.log(date, repeat, until, price)}}>Submit</Button>
            </DialogClose>
        </div>
    </div>
  )
}
