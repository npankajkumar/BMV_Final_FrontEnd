import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from './ui/calendar'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { DialogClose } from './ui/dialog'

const CustomSlotCard = () => {
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const [startHour, setStartHour] = useState<string>();
    const [startMinute, setStartMinute] = useState<string>();
    const [endHour, setEndHour] = useState<string>();
    const [endMinute, setEndMinute] = useState<string>();
  return (
    <div>
        <div className='flex flex-col gap-2'>
            <p className='font-semibold'>{"Start"}</p>
            <div className='grid grid-cols-2 gap-4'>
            <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start my-auto text-left font-normal",
            !startDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={startDate}
          onSelect={setStartDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    <div className='flex gap-2 my-4'>
    <Select onValueChange={setStartHour} defaultValue={startHour}>
      <SelectTrigger className="">
        <SelectValue placeholder="HH" />
      </SelectTrigger>
      <SelectContent className='h-40'>
        <SelectGroup>
          {
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"].map(hour=><SelectItem key={hour} value={hour}>{hour}</SelectItem>)
          }
        </SelectGroup>
      </SelectContent>
    </Select>
    {" : "}
    <Select onValueChange={setStartMinute} defaultValue={startMinute}>
      <SelectTrigger className="">
        <SelectValue placeholder="MM"/>
      </SelectTrigger>
      <SelectContent className='h-40'>
        <SelectGroup>
          {
            ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"].map(minute=><SelectItem key={minute} value={minute}>{minute}</SelectItem>)
          }
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>

        </div>
        </div>
        <div className='flex flex-col gap-2'>
            <p className='font-semibold'>{"End"}</p>
            <div className='grid grid-cols-2 gap-4'>
            <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start my-auto text-left font-normal",
            !endDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          disabled = {(cdate)=>{return cdate<(startDate??new Date())}}
          selected={endDate}
          onSelect={setEndDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    <div className='flex gap-2 my-4'>
    <Select onValueChange={setEndHour} defaultValue={endHour}>
      <SelectTrigger className="">
        <SelectValue placeholder="HH" />
      </SelectTrigger>
      <SelectContent className='h-40'>
        <SelectGroup>
          {
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"].filter(hour=>
                {const ch = parseInt(hour);
                    if((startDate ?? new Date())<=(endDate??new Date()) && (parseInt(startHour??"24"))<=ch)
                        return true
                    return false
            }).map(hour=><SelectItem key={hour} value={hour}>{hour}</SelectItem>)
          }
        </SelectGroup>
      </SelectContent>
    </Select>
    {" : "}
    <Select onValueChange={setEndMinute} defaultValue={endMinute}>
      <SelectTrigger className="">
        <SelectValue placeholder="MM"/>
      </SelectTrigger>
      <SelectContent className='h-40'>
        <SelectGroup>
          {
            ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"].map(minute=><SelectItem key={minute} value={minute}>{minute}</SelectItem>)
          }
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>

        </div>
        </div>
        <div className="flex justify-around gap-4">
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Submit</Button>
            </DialogClose>
        </div>
    </div>
  )
}

export default CustomSlotCard