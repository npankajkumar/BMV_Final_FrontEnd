import { CardTitle } from "./ui/card";
import VenueCard from "./VenueCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface cardData {
  id: number;
  name: string;
  rating: number;
  city: string;
  imageUrl: string;
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
  cardDataArray: cardData[];
}) => {
  return (
    <div className={`${className}`}>
      <CardTitle className="mb-4 font-medium">{title}:</CardTitle>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">

        {cardDataArray.length!=0 ? <div className="flex w-max space-x-4 p-4">
          {(cardDataArray.map((cardData) => (
            <div key={cardData.id}>
              <VenueCard
                id={cardData.id}
                title={cardData.name}
                city={cardData.city}
                rating={cardData.rating}
                imageUrl={cardData.imageUrl}
                provider={cardData.provider}
                latitude={cardData.latitude}
                longitude={cardData.longitude}
              />
            </div>)
          ))}
        </div> :<div className="flex justify-center items-center h-[200px]">
          {title === "Top Rated" ? "No Top Rated Venues as of now..." : "No Top Booked Venues as of now..." }</div>}
        <ScrollBar orientation="horizontal" className="text-primary" />
      </ScrollArea>
    </div>
  );
};

export default UserVenueCardsGrid;
