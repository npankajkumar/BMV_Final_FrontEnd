import { CardTitle } from "./ui/card";
import VenueCard from "./VenueCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CardData {
  id: number;
  title: string; // Include title here
  rating: number;
  city: string;
  imageUrl: string[];
  provider: string;
  latitude: number;
  longitude: number;
}

const UserVenueCardsGrid = ({
  className,
  title,
  cardDataArray,
}: {
  className?: string;
  title: string;
  cardDataArray: CardData[];
}) => {
  return (
    <div className={`${className}`}>
      <CardTitle
        style={{ fontFamily: "Montserrat" }}
        className="mb-4  font-semibold text-xl text-gray-900 dark:text-white"
      >
        {title} :
      </CardTitle>
      <ScrollArea className="w-full rounded-md border">
        {cardDataArray.length !== 0 ? (
          <div className="flex w-max space-x-6 p-6">
            {cardDataArray.map((cardData) => (
              <div key={cardData.id} className="w-72">
                <VenueCard {...cardData} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[200px] text-muted-foreground">
            {title === "Top Rated Venues"
              ? "No Top Rated Venues."
              : "No Top Booked Venues."}
          </div>
        )}
        <ScrollBar orientation="horizontal" className="text-primary" />
      </ScrollArea>
    </div>
  );
};

export default UserVenueCardsGrid;
