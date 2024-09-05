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