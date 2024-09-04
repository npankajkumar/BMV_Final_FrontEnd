import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectScrollable() {
  return (
    <Select>
      <SelectTrigger className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10">
        <SelectValue placeholder="Select your kind of Property" />
      </SelectTrigger>
      <SelectContent className="max-h-40 overflow-y-auto">
        <SelectItem value="function_hall">Function Hall</SelectItem>
        <SelectItem value="play_ground">Play Ground</SelectItem>
        <SelectItem value="work_space">Work Space</SelectItem>
        <SelectItem value="turf_cricket">Turf Cricket</SelectItem>
        <SelectItem value="turf_indoor_games">Turf Indoor Games</SelectItem>
        <SelectItem value="hotel">Hotel</SelectItem>
        <SelectItem value="play_area">Play Area</SelectItem>
        <SelectItem value="park">Park</SelectItem>
        <SelectItem value="rental_rooms">Rental Rooms</SelectItem>
      </SelectContent>
    </Select>
  );
}
