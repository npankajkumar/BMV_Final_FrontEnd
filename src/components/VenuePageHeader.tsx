import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

const VenuePageHeader = ({
  venue,
  btnName = "Book",
  book,
  showButton,
  onBookClick,
}: {
  venue: any;
  btnName: string;
  book: boolean;
  showButton: boolean;
  onBookClick: () => void;
}) => {
  const [pName, setPName] = useState<any>();
  const [cName, setCName] = useState<any>();
  console.log(venue);
  useEffect(() => {
    getProviderById(venue.providerId)
      .then((p) => setPName(p.name))
      .then(() => {
        getCategoryById(venue.categoryId).then((c) => setCName(c.name));
      });
  }, []);

  return (
    <div className=" grid md:grid-cols-2 grid-cols-1 space-y-0.5">
      <div className="flex flex-col gap-2 justify-center">
        <h2 className="text-2xl font-bold tracking-tight">{venue.name}</h2>
        <div className="flex gap-2 items-center">
          <h3 className="text-xl tracking-tight mb-1">{pName}</h3>
          {showButton && <Separator orientation="vertical" />}
          {showButton && (
            <Button className="bg-primary" onClick={onBookClick}>
              {book ? "Cancel" : btnName}
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-wrap max-w-full">{venue.description}</p>
        <div className="flex gap-2">
          <Badge variant="outline" className="border-primary">
            {cName}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export const getProviderById = async (id: number) => {
  const res = await axios.get(`http://localhost:5059/api/Providers/${id}`);
  return res.data;
};

const getCategoryById = async (id: number) => {
  const res = await axios.get(`http://localhost:5059/api/Category/${id}`);
  return res.data;
};

export default VenuePageHeader;
