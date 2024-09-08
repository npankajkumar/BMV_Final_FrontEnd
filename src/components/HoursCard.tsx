"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format, isToday } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { generateTimeStrings } from "./CreateSlotDialouge"

const FormSchema = z.object({
  slotDate: z.date({
    required_error: "A date of birth is required.",
  }),
  startTime: z
    .string({
      required_error: "Please select a start date.",
    }),
    endTime: z
    .string({
      required_error: "Please select an end date.",
    })
})

export function HoursCard() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })


  const slotDate = form.watch("slotDate")
  const startTime = form.watch("startTime");

  function onSubmit(data: z.infer<typeof FormSchema>) {
   console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="slotDate"
          render={({ field }) => (
            <FormItem className="flex flex-col my-auto">
              <FormLabel>Slot Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal my-2",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>{
                        if(isToday(date))
                            return false
                      return date < new Date()
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem className="flex flex-col my-auto justify-center">
              <FormLabel>Start Time</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a start time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {generateTimeStrings(slotDate).map((time,i)=><SelectItem key={i} value={`${time.hour}-${time.minute}`}>{`${time.hour}-${time.minute}`}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {startTime && <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem className="flex flex-col my-auto justify-center">
              <FormLabel>End Time</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an end time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="h-40">
                  {generateTimeStrings(slotDate).filter(time=>{const h =parseInt(startTime.split("-")[0]); const m=parseInt(startTime.split("-")[1])+15;
                  if(time.hour<h || (time.hour==h && time.minute<m)){
                    return false
                  }
                  else{
                    return true
                  }
                  }).map((time,i)=><SelectItem key={i} value={`${time.hour}-${time.minute}`}>{`${time.hour}-${time.minute}`}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
