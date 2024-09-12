import { CardTitle } from "./ui/card";
import VenueCard from "./VenueCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface cardData {
  title: string;
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
      <CardTitle className="mb-4">{title}:</CardTitle>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {cardDataArray.map((cardData, i) => (
            <div key={i}>
              <VenueCard
                id={i}
                title={cardData.title}
                city={cardData.city}
                rating={cardData.rating}
                imageUrl={cardData.imageUrl}
                provider={cardData.provider}
                latitude={cardData.latitude}
                longitude={cardData.longitude}
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="text-primary" />
      </ScrollArea>
    </div>
  );
};

export default UserVenueCardsGrid;
