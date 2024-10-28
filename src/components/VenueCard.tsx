import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MapPin, MoveUpRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const VenueCard = ({
  id,
  title,
  rating,
  city,
  imageUrl,
  latitude,
  provider,
  longitude,
}: {
  id: number;
  title: string;
  rating: number;
  city: string;
  imageUrl: string[];
  latitude: number;
  provider: string;
  longitude: number;
}) => {
  const roundToTwoDigits = (value: number): number => {
    return parseFloat(value.toFixed(1));
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-slate-700 dark:hover:shadow-lg">
      <Link to={`/venues/${id}`} className="block">
        <div className="relative h-48">
          <img
            src={imageUrl[0]}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-full flex items-center gap-1 shadow dark:shadow-md dark:bg-gray-800 dark:text-white">
            <Star fill="#FDCC0D" className="w-4 h-4" strokeWidth={1} />
            <span className="text-sm font-medium">
              {roundToTwoDigits(rating)}
            </span>
          </div>
        </div>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold mb-2 truncate">
            {title}
          </CardTitle>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{city}</span>
            </div>
            <a
              className="flex items-center gap-1 text-primary hover:underline"
              href={`https://maps.google.com/?q=${latitude},${longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              View on maps
              <MoveUpRight className="w-4 h-4" />
            </a>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default VenueCard;
