import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MapPin, MoveUpRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const VenueCard = ({
  id,
  title,
  rating,
  city,
  imageUrl,
  provider,
  latitude,
  longitude,
}: {
  id: number;
  title: string;
  rating: number;
  city: string;
  imageUrl: string;
  provider: string;
  latitude: number;
  longitude: number;
}) => {
  return (
    <Card className="p-2 w-80 h-60 shadow-xl">
      <Link to={`/venues/${id}`}>
        <img
          src={imageUrl[0]}
          alt="VenueImage"
          className="h-4/6 w-full rounded-md"
        />
        <div className="flex justify-between w-full pt-2 pb-1 px-2">
          <CardTitle className="">{title}</CardTitle>
          <CardContent className="m-0 p-0 text-lg flex gap-1">
            {rating}
            <Star className="w-4 h-4 my-auto text-yellow-500" />
          </CardContent>
        </div>
      </Link>
      <div className="flex justify-between w-full px-2 py-1">
        <CardContent className="p-0">{provider}</CardContent>
        <MapPin className="w-4 h-4 ml-auto my-auto" />
        <a
          className="m-0 p-0 text-lg flex gap-1 my-auto "
          href={`https://maps.google.com/?q=${latitude},${longitude}`}
          target="_blank"
        >
          <p
            className="decoration-solid decoration-primary underline underline-offset-2
"
          >
            {city}
          </p>
          <MoveUpRight className="w-4 h-4 my-auto text-primary" />
        </a>
      </div>
    </Card>
  );
};

export default VenueCard;
