import { Star } from "lucide-react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const VenuePageHeader = ({
  btnName = "Book",
  book,
  onBookClick,
}: {
  btnName: string;
  book: boolean;
  onBookClick: () => void;
}) => {
  const category = "Turf";
  return (
    <div className=" grid grid-cols-2 space-y-0.5">
      <div className="flex flex-col gap-2 justify-center">
        <h2 className="text-2xl font-bold tracking-tight">Box Cricket</h2>
        <div className="flex gap-2">
          <h3 className="text-xl tracking-tight mb-1">Eagle Academy</h3>
          <Separator orientation="vertical" />
          <p className="flex gap-2 my-auto">
            4.5 <Star className="w-4 h-4 my-auto text-primary" />
          </p>
          <Separator orientation="vertical" />
          <Button className="bg-primary" onClick={onBookClick}>
            {book ? "Cancel" : btnName}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-wrap">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, quam
          iste nobis consequatur ea sit consequuntur tenetur? A, nemo magni quas
          reiciendis placeat sint laborum adipisci vitae voluptatum non dolorem!
        </p>
        <div className="flex gap-2">
          <Badge variant="outline" className="border-primary">
            {category}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default VenuePageHeader;
