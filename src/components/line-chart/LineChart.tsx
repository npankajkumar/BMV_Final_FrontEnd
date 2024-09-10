import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis ,Bar, BarChart,  LabelList, } from "recharts"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { format } from "date-fns"

export const description = "A linear line chart"

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ]

const chartConfig = {
  earnings: {
    label: "Earings",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

type dayEarning = {day:number, earnings:number}

export function EarningsChart({className, data, bookings, percentageIncrease}:{percentageIncrease:number,bookings:number,className?:string, data:dayEarning[]}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Earnings this month</CardTitle>
        <CardDescription>June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="earnings"
              type="linear"
              stroke="var(--color-earnings)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by {percentageIncrease}% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing for {bookings} bookings
        </div>
      </CardFooter>
    </Card>
  )
}

export function BarChartComponent({className, data, bookings, percentageIncrease}:{percentageIncrease:number,bookings:number,className?:string, data:dayEarning[]}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Earnings this month</CardTitle>
        <CardDescription>{format(new Date(),"MMMM, yyyy")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="earnings" fill="var(--color-earnings)" radius={8}>
              
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by {percentageIncrease}% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total earnings for {bookings} bookings
        </div>
      </CardFooter>
    </Card>
  )
}
