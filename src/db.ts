import { Slot } from "./components/data-table/columns";

export const venueCardsData = [
  { title: "Sunset Boulevard", rating: 4.5, city: "Los Angeles", imageUrl: "https://media.hudle.in/photos/49940", provider: "Provider A", latitude: 34.0522, longitude: -118.2437 },
  { title: "Central Park", rating: 4.7, city: "New York", imageUrl: "https://media.hudle.in/photos/49940", provider: "Provider B", latitude: 40.7851, longitude: -73.9683 },
  { title: "Eiffel Tower", rating: 4.8, city: "Paris", imageUrl: "https://media.hudle.in/photos/49940", provider: "Provider C", latitude: 48.8584, longitude: 2.2945 },
  { title: "Tokyo Tower", rating: 4.6, city: "Tokyo", imageUrl: "https://media.hudle.in/photos/49940", provider: "Provider D", latitude: 35.6586, longitude: 139.7454 },
  { title: "Great Wall", rating: 4.9, city: "Beijing", imageUrl: "https://media.hudle.in/photos/49940", provider: "Provider E", latitude: 40.4319, longitude: 116.5704 },
  { title: "Sydney Opera House", rating: 4.7, city: "Sydney", imageUrl: "https://media.hudle.in/photos/49940", provider: "Provider F", latitude: -33.8568, longitude: 151.2153 },
  { title: "Colosseum", rating: 4.8, city: "Rome", imageUrl: "https://media.hudle.in/photos/49940", provider: "Provider G", latitude: 41.8902, longitude: 12.4922 },
  { title: "Statue of Liberty", rating: 4.6, city: "New York", imageUrl: "https://media.hudle.in/photos/49940", provider: "Provider H", latitude: 40.6892, longitude: -74.0445 },
  { title: "Big Ben", rating: 4.5, city: "London", imageUrl: "https://media.hudle.in/photos/49940", provider: "Provider I", latitude: 51.5007, longitude: -0.1246 }
];

export const availableSlots: Slot[] = [
  { id: "slot1", amount: 100, status: "available", from: new Date("2024-09-01T08:00:00"), to: new Date("2024-09-01T12:00:00"), duration: 4 },
  { id: "slot2", amount: 200, status: "blocked", from: new Date("2024-09-02T09:30:00"), to: new Date("2024-09-02T11:30:00"), duration: 2 },
  { id: "slot3", amount: 150, status: "available", from: new Date("2024-09-03T14:00:00"), to: new Date("2024-09-03T18:00:00"), duration: 4 },
  { id: "slot4", amount: 300, status: "blocked", from: new Date("2024-09-04T10:00:00"), to: new Date("2024-09-04T15:00:00"), duration: 5 },
  { id: "slot5", amount: 250, status: "available", from: new Date("2024-09-05T07:00:00"), to: new Date("2024-09-05T13:00:00"), duration: 6 },
  { id: "slot6", amount: 350, status: "blocked", from: new Date("2024-09-06T16:00:00"), to: new Date("2024-09-06T20:00:00"), duration: 4 },
  { id: "slot7", amount: 400, status: "available", from: new Date("2024-09-07T11:00:00"), to: new Date("2024-09-07T14:00:00"), duration: 3 },
  { id: "slot8", amount: 450, status: "blocked", from: new Date("2024-09-08T13:00:00"), to: new Date("2024-09-08T17:00:00"), duration: 4 },
  { id: "slot9", amount: 500, status: "available", from: new Date("2024-09-09T09:00:00"), to: new Date("2024-09-09T12:00:00"), duration: 3 },
  { id: "slot10", amount: 550, status: "blocked", from: new Date("2024-09-10T15:00:00"), to: new Date("2024-09-10T19:00:00"), duration: 4 },
  { id: "slot11", amount: 600, status: "available", from: new Date("2024-09-11T08:30:00"), to: new Date("2024-09-11T12:30:00"), duration: 4 },
  { id: "slot12", amount: 650, status: "blocked", from: new Date("2024-09-12T10:00:00"), to: new Date("2024-09-12T14:00:00"), duration: 4 },
  { id: "slot13", amount: 700, status: "available", from: new Date("2024-09-13T13:30:00"), to: new Date("2024-09-13T17:30:00"), duration: 4 },
  { id: "slot14", amount: 750, status: "blocked", from: new Date("2024-09-14T09:00:00"), to: new Date("2024-09-14T13:00:00"), duration: 4 },
  { id: "slot15", amount: 800, status: "available", from: new Date("2024-09-15T11:00:00"), to: new Date("2024-09-15T15:00:00"), duration: 4 },
  { id: "slot16", amount: 850, status: "blocked", from: new Date("2024-09-16T14:00:00"), to: new Date("2024-09-16T18:00:00"), duration: 4 },
  { id: "slot17", amount: 900, status: "available", from: new Date("2024-09-17T10:00:00"), to: new Date("2024-09-17T14:00:00"), duration: 4 },
  { id: "slot18", amount: 950, status: "blocked", from: new Date("2024-09-18T12:00:00"), to: new Date("2024-09-18T16:00:00"), duration: 4 },
  { id: "slot19", amount: 1000, status: "available", from: new Date("2024-09-19T09:30:00"), to: new Date("2024-09-19T13:30:00"), duration: 4 },
  { id: "slot20", amount: 1050, status: "blocked", from: new Date("2024-09-20T15:00:00"), to: new Date("2024-09-20T19:00:00"), duration: 4 }
];

export const chartData = [
  { "day": 1, "earnings": 200 },
  { "day": 2, "earnings": 150 },
  { "day": 3, "earnings": 220 },
  { "day": 4, "earnings": 180 },
  { "day": 5, "earnings": 210 },
  { "day": 6, "earnings": 190 },
  { "day": 7, "earnings": 230 },
  { "day": 8, "earnings": 170 },
  { "day": 9, "earnings": 250 },
  { "day": 10, "earnings": 160 },
  { "day": 11, "earnings": 240 },
  { "day": 12, "earnings": 200 },
  { "day": 13, "earnings": 180 },
  { "day": 14, "earnings": 220 },
  { "day": 15, "earnings": 210 },
  { "day": 16, "earnings": 190 },
  { "day": 17, "earnings": 230 },
  { "day": 18, "earnings": 170 },
  { "day": 19, "earnings": 250 },
  { "day": 20, "earnings": 160 },
  { "day": 21, "earnings": 240 },
  { "day": 22, "earnings": 200 },
  { "day": 23, "earnings": 180 },
  
]

export const earningsByDayConfig = {
  earnings: {
    label: "Earnings",
  },
  monday: {
    label: "Monday",
    color: "hsl(var(--chart-1))",
  },
  tuesday: {
    label: "Tuesday",
    color: "hsl(var(--chart-2))",
  },
  wednesday: {
    label: "Wednesday",
    color: "hsl(var(--chart-3))",
  },
  thursday: {
    label: "Thursday",
    color: "hsl(var(--chart-4))",
  },
  friday: {
    label: "Friday",
    color: "hsl(var(--chart-5))",
  },
  saturday:{
    label: "Saturday",
    color: "hsl(var(--chart-6))",
  },
  sunday:{
    label:"Sunday",
    color: "hsl(var(--chart-7))"
  }
}

export const earningsByHourConfig = {
  earnings:{label:"Earnings"},
  h12am: { label: "12 A.M - 1 A.M", color: "hsl(347, 77%, 50%)" },
  h1am: { label: "1 A.M - 2 A.M", color: "hsl(347, 77%, 55%)" },
  h2am: { label: "2 A.M - 3 A.M", color: "hsl(347, 77% ,45%)" },
  h3am: { label: "3 A.M - 4 A.M", color: "hsl(347, 77% 6,0%)" },
  h4am: { label: "4 A.M - 5 A.M", color: "hsl(347, 77% 40,%)" },
  h5am: { label: "5 A.M - 6 A.M", color: "hsl(347, 77% 65%,)" },
  h6am: { label: "6 A.M - 7 A.M", color: "hsl(347, 77% 35%)," },
  h7am: { label: "7 A.M - 8 A.M", color: "hsl(347, 77% 70%)", },
  h8am: { label: "8 A.M - 9 A.M", color: "hsl(347, 77% 30%)" ,},
  h9am: { label: "9 A.M - 10 A.M", color: "hsl(347, 77%, 75%)" ,},
  h10am: { label: "10 A.M - 11 A.M", color: "hsl(347, 77%, 25%)" },
  h11am: { label: "11 A.M - 12 P.M", color: "hsl(347, 77% ,80%)" },
  h12pm: { label: "12 P.M - 1 P.M", color: "hsl(347, 77% 2,0%)" },
  h1pm: { label: "1 P.M - 2 P.M", color: "hsl(347, 77% 85,%)" },
  h2pm: { label: "2 P.M - 3 P.M", color: "hsl(347, 77% 15%,)" },
  h3pm: { label: "3 P.M - 4 P.M", color: "hsl(347, 77% 90%)," },
  h4pm: { label: "4 P.M - 5 P.M", color: "hsl(347, 77% 10%)", },
  h5pm: { label: "5 P.M - 6 P.M", color: "hsl(347, 77% 95%)" ,},
  h6pm: { label: "6 P.M - 7 P.M", color: "hsl(347, 77%, 5%)" },
  h7pm: { label: "7 P.M - 8 P.M", color: "hsl(347, 77%, 100%)" ,},
  h8pm: { label: "8 P.M - 9 P.M", color: "hsl(347, 77%, 50%)" },
  h9pm: { label: "9 P.M - 10 P.M", color: "hsl(347, 77% ,55%)" },
  h10pm: { label: "10 P.M - 11 P.M", color: "hsl(347, 77%, 45%)" },
  h11pm: { label: "11 P.M - 12 A.M", color: "red" }
};

export const earningsByDayChartData = [
  { "day": "monday", "earnings": 275, "fill": "var(--color-monday)" },
  { "day": "tuesday", "earnings": 320, "fill": "var(--color-tuesday)" },
  { "day": "wednesday", "earnings": 290, "fill": "var(--color-wednesday)" },
  { "day": "thursday", "earnings": 310, "fill": "var(--color-thursday)" },
  { "day": "friday", "earnings": 280, "fill": "var(--color-friday)" },
  { "day": "saturday", "earnings": 350, "fill": "var(--color-saturday)" },
  { "day": "sunday", "earnings": 300, "fill": "var(--color-sunday)" }
]



export const earningsByHourChartData = [
  { "hour": "h12am", "earnings": 275, "fill": "var(--color-h12am)" },
  { "hour": "h1am", "earnings": 150, "fill": "var(--color-h1am)" },
  { "hour": "h2am", "earnings": 200, "fill": "var(--color-h2am)" },
  { "hour": "h3am", "earnings": 180, "fill": "var(--color-h3am)" },
  { "hour": "h4am", "earnings": 220, "fill": "var(--color-h4am)" },
  { "hour": "h5am", "earnings": 190, "fill": "var(--color-h5am)" },
];
type slot = {id:string, start:Date, end: Date, price:number, status:"booked"|"blocked"|"available"}

export const slots:slot[] = [
  { id: "1", start: new Date("2024-09-10T08:00:00"), end: new Date("2024-09-10T09:00:00"), price: 100, status: "available" },
  { id: "2", start: new Date("2024-09-10T09:30:00"), end: new Date("2024-09-10T10:30:00"), price: 150, status: "booked" },
  { id: "3", start: new Date("2024-09-10T11:00:00"), end: new Date("2024-09-10T12:00:00"), price: 120, status: "blocked" },
  { id: "4", start: new Date("2024-09-10T12:30:00"), end: new Date("2024-09-10T13:30:00"), price: 130, status: "available" },
  { id: "5", start: new Date("2024-09-10T14:00:00"), end: new Date("2024-09-10T15:00:00"), price: 140, status: "booked" },
  { id: "6", start: new Date("2024-09-10T15:30:00"), end: new Date("2024-09-10T16:30:00"), price: 110, status: "blocked" },
  { id: "7", start: new Date("2024-09-10T17:00:00"), end: new Date("2024-09-10T18:00:00"), price: 160, status: "available" },
  { id: "8", start: new Date("2024-09-10T18:30:00"), end: new Date("2024-09-10T19:30:00"), price: 170, status: "booked" },
  { id: "9", start: new Date("2024-09-10T20:00:00"), end: new Date("2024-09-10T21:00:00"), price: 180, status: "blocked" },
  { id: "10", start: new Date("2024-09-10T21:30:00"), end: new Date("2024-09-10T22:30:00"), price: 190, status: "available" },
  { id: "11", start: new Date("2024-09-11T08:00:00"), end: new Date("2024-09-11T09:00:00"), price: 200, status: "booked" },
  { id: "12", start: new Date("2024-09-11T09:30:00"), end: new Date("2024-09-11T10:30:00"), price: 210, status: "blocked" },
  { id: "13", start: new Date("2024-09-11T11:00:00"), end: new Date("2024-09-11T12:00:00"), price: 220, status: "available" },
  { id: "14", start: new Date("2024-09-11T12:30:00"), end: new Date("2024-09-11T13:30:00"), price: 230, status: "booked" },
  { id: "15", start: new Date("2024-09-11T14:00:00"), end: new Date("2024-09-11T15:00:00"), price: 240, status: "blocked" },
  { id: "16", start: new Date("2024-09-11T15:30:00"), end: new Date("2024-09-11T16:30:00"), price: 250, status: "available" },
  { id: "17", start: new Date("2024-09-11T17:00:00"), end: new Date("2024-09-11T18:00:00"), price: 260, status: "booked" },
  { id: "18", start: new Date("2024-09-11T18:30:00"), end: new Date("2024-09-11T19:30:00"), price: 270, status: "blocked" },
  { id: "19", start: new Date("2024-09-11T20:00:00"), end: new Date("2024-09-11T21:00:00"), price: 280, status: "available" },
  { id: "20", start: new Date("2024-09-11T21:30:00"), end: new Date("2024-09-11T22:30:00"), price: 290, status: "booked" }
];

export const categories = [
  "turf",
  "box cricket",
  "ground",
  "shed",
  "playarea",
  "others"
]

export function generateTimeSlots(startTimeStr = '00:00:00') {
  const timeSlots = [];
  const startTime = new Date();
  const [hours, minutes, seconds] = startTimeStr.split(':').map(Number);
  startTime.setHours(hours, minutes, seconds, 0);

  // Increment the start time by 15 minutes
  startTime.setMinutes(startTime.getMinutes() + 15);

  // Round up to the nearest 15-minute interval
  const remainder = startTime.getMinutes() % 15;
  if (remainder !== 0) {
      startTime.setMinutes(startTime.getMinutes() + (15 - remainder));
  }

  while (startTime.getDay() <= new Date().getDay()) {
      const label = startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      const value = startTime.toTimeString().split(' ')[0];

      timeSlots.push({ label, value });

      startTime.setMinutes(startTime.getMinutes() + 15);
  }

  return timeSlots;
}

export function generateDurations(startTimeStr = '00:00:00') {
  const timeSlots = [];
  const startTime = new Date();
  const [hours, minutes, seconds] = startTimeStr.split(':').map(Number);
  startTime.setHours(hours, minutes, seconds, 0);

  // Increment the start time by 15 minutes
  startTime.setMinutes(startTime.getMinutes() + 15);

  // Round up to the nearest 15-minute interval
  const remainder = startTime.getMinutes() % 15;
  if (remainder !== 0) {
      startTime.setMinutes(startTime.getMinutes() + (15 - remainder));
  }

  while (startTime.getDay() <= new Date().getDay()) {
      const hours = startTime.getHours()
      let label = "";
      if(hours>0){
        label = label + hours+" hrs "
      }
      if(startTime.getMinutes()>0)
      label += startTime.getMinutes()+" mins"
      const value = startTime.toTimeString().split(' ')[0];

      timeSlots.push({ label, value });

      startTime.setMinutes(startTime.getMinutes() + 15);
  }

  return timeSlots;
}