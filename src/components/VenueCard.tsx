import {
    Card,
    CardContent,
    CardTitle,
  } from "@/components/ui/card"
import { MapPin, MoveUpRight  } from 'lucide-react';

const VenueCard = ({title, rating, city, imageUrl, provider, latitude, longitude}:{title:string, rating:number, city:string, imageUrl:string, provider:string, latitude:number, longitude:number}) => {
  return (
    <Card className="p-2 w-80 h-60 shadow-xl">
            <img src={`${imageUrl}`} alt="VenueImage" className="h-4/6 w-full rounded-md"/>
            <div className="flex justify-between w-full pt-2 pb-1 px-2">
            <CardTitle className="">{title}</CardTitle>
            <CardContent className="m-0 p-0 text-lg flex gap-1">{rating}
            <img src="https://th.bing.com/th/id/OIP.3R3VbDyTy9MkWrYX72DYtwHaHa?rs=1&pid=ImgDetMain" className="w-4 h-4 my-auto"/>
            </CardContent>
            </div>
            <div className="flex justify-between w-full px-2 py-1">
            <CardContent className="p-0">{provider}</CardContent>
              <MapPin className="w-4 h-4 ml-auto my-auto"/>
            <a className="m-0 p-0 text-lg flex gap-1 my-auto " href={`https://maps.google.com/?q=${latitude},${longitude}`} target="_blank">
                <p className="decoration-solid decoration-primary underline underline-offset-2
">{city}</p>
              <MoveUpRight className="w-4 h-4 my-auto text-primary"/>
            </a>
            </div>
</Card>


  )
}

export default VenueCard