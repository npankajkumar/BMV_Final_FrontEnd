import { format, isWeekend } from "date-fns";
import { useState } from "react";

type slot = {
  id: string;
  start: string;
  end: string;
  price: number;
  status: "booked" | "blocked" | "available";
};
type onClick = (selectedSlot: slot, selected: boolean) => void;

const SlotBox = ({ slot, onClick }: { slot: slot; onClick: any }) => {
  const blocked = "bg-gray-100 cursor-not-allowed";
  const booked = "bg-red-100 cursor-not-allowed";
  const available = "bg-green-100 cursor-pointer";
  const selected = "bg-primary cursor-pointer";

  const [select, setSelect] = useState<boolean>(false);

  const handleClick = () => {
    if (slot.status == "booked" || slot.status == "blocked") return;
    onClick(slot, !select);
    setSelect((c) => !c);
  };

  return (
    <div
      onClick={handleClick}
      className={`border border-black w-fit rounded-sm text-center dark:text-black ${
        slot.status == "blocked"
          ? blocked
          : slot.status == "booked"
          ? booked
          : select == true
          ? selected
          : available
      }`}
    >
      <div className="flex border-b border-black">
        <div className=" border-black px-2">
          <div className="text-md font-semibold">
            {convertTo12HourFormat(slot.start)}
          </div>
        </div>
        <div className="border-l border-black px-2">
          <div className="text-md font-semibold">
            {convertTo12HourFormat(slot.end)}
          </div>
        </div>
      </div>
      <div className="font-medium text-md">&#x20b9; {slot.price}</div>
    </div>
  );
};

function convertTo12HourFormat(time: string): string {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
  return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}
export default SlotBox;

