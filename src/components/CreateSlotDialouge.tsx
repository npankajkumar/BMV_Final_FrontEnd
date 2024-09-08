import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { ConditionalDatePicker } from "./ConditionalDatePicker"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { add, isToday, set } from "date-fns"
import { useEffect, useState } from "react"
import { time } from "console"
import { HoursCard } from "./HoursCard"
import { DaysCard } from "./DaysCard"
import CustomSlotCard from "./CustomSlotCard"

export function CreateSlotDialouge() {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Slots</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] min-w-fit">
        <DialogHeader>
          <DialogTitle>Create Slots</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <Tabs defaultValue="hours" className="">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="hours">Hours</TabsTrigger>
        <TabsTrigger value="days">Days</TabsTrigger>
        <TabsTrigger value="custom">Custom</TabsTrigger>
      </TabsList>
      <TabsContent value="hours">
          <HoursCard/>
      </TabsContent>
      <TabsContent value="days">
          <DaysCard/>
      </TabsContent>
      <TabsContent value="custom">
          <CustomSlotCard/>
      </TabsContent>
    </Tabs>
      </DialogContent>
    </Dialog>
  )
}

const HCard = ()=>{
  const [date, setDate] = useState<Date>(new Date());
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());

  const handleDateChange = (date:Date|undefined)=>{
    console.log("in handle date change")
    if(!date)
    return
    if(isToday(date))
    setDate(new Date())
    else setDate(date);
    setFromDate(date);
    setToDate(date);
  }

  const handleFromTimeSelection = (timeString:string)=>{
    setFromDate((curr)=>{const splitedArr = timeString.split(":"); return set(curr, {hours:parseInt(splitedArr[0]),minutes:parseInt(splitedArr[1].substring(0,2))})})
    setToDate(set(fromDate, {minutes:16}));
    console.log(fromDate.getTime(), toDate.getTime());
  }

  const handleToTimeSelection = (timeString:string)=>{
    setToDate(set(fromDate, {minutes:16}));
  }

  return <Card>
  <CardHeader>
    <CardTitle>Select time period</CardTitle>
  </CardHeader>
  <CardContent className="space-y-2">
    <div className="space-y-1 flex gap-4">
      <ConditionalDatePicker fromDate={new Date()} date={date} handleDateChange={handleDateChange}/>
      <TimeSelection from={add(date, {minutes:1})}  handleTimeSelection={handleFromTimeSelection}/>
      <TimeSelection from={add(date, {minutes:15})}  handleTimeSelection={handleToTimeSelection}/>
    </div>
    <div className="space-y-1">
      <Label htmlFor="username">Username</Label>
      <Input id="username" defaultValue="@peduarte" />
    </div>
  </CardContent>
  <CardFooter>
    <Button>Save changes</Button>
  </CardFooter>
</Card>
}

const TimeSelection = ({from, handleTimeSelection}:{from:Date,  handleTimeSelection:(timeString: string) => void})=>{
  let [times, setTimes] = useState<string[]>([]);
    useEffect(()=>{
  //  setTimes(generateTimeStrings(from));
    },[])

    return <Select onValueChange={handleTimeSelection}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Start Time" />
    </SelectTrigger>
    <SelectContent className="h-40">
      <SelectGroup >
        {times.map(time=> <SelectItem value={time} key={time} >{time}</SelectItem> )}
      </SelectGroup>
    </SelectContent>
  </Select>
}
export function generateTimeStrings(startDate:Date) {
  const date = isToday(startDate)?new Date():startDate 
  const times = [];
  const hours = 24;
  const minutes = [0, 15, 30, 45];

  for (let hour = 0; hour < hours; hour++) {
    for (let minute of minutes) {
      if(isToday(date) && (hour < date.getHours() || minute < date.getMinutes())){
        continue;
      }
      let period = hour < 12 ? "A.M" : "P.M";
      let displayHour = hour % 12 === 0 ? 12 : hour % 12;
      let displayMinute = minute === 0 ? "00" : minute;
      // times.push(`${displayHour}${displayMinute}`);
      times.push({hour, minute})
    }
  }
  return times;
}

