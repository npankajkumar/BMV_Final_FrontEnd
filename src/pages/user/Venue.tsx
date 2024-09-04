import VenuePageHeader from "@/components/VenuePageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { IndianRupee } from "lucide-react"

const Venue = () => {
    const imageUrl =  "https://media.hudle.in/photos/49940"
  return (
    <div className="p-6">

    <VenuePageHeader/>
    <Separator className="my-6"/>
    <div className="grid grid-cols-3 gap-4">
        <ScrollArea className="h-60 w-full whitespace-nowrap rounded-md">
            <div className="flex flex-col gap-4 w-max mx-auto">
                {[1,2,3].map(i=><div key={i} className=" ">
                    <img src={imageUrl} alt="" className="bg-cover overflow-hidden rounded-lg h-60"/>
                </div>)}
            </div>
        </ScrollArea>
        <div className="col-span-2">
            <div className="grid grid-cols-2 gap-8">
            <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-medium text-center">
                Weekdays
              </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold flex gap-1 my-2"><IndianRupee className="h-5 w-5 mt-2" /> <div className="my-auto">230 </div><div className="text-sm font-normal my-auto mt-2">/ hour</div></div>
            <div className="text-2xl font-bold flex gap-1 my-2"><IndianRupee className="h-5 w-5 mt-2" /> <div className="my-auto">230 </div><div className="text-sm font-normal my-auto mt-2">/ day</div></div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-medium text-center">
                Weekends
              </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold flex gap-1 my-2"><IndianRupee className="h-5 w-5 mt-2" /> <div className="my-auto">290 </div><div className="text-sm font-normal my-auto mt-2">/ hour</div></div>
            <div className="text-2xl font-bold flex gap-1 my-2"><IndianRupee className="h-5 w-5 mt-2" /> <div className="my-auto">1000 </div><div className="text-sm font-normal my-auto mt-2">/ day</div></div>
            </CardContent>
          </Card>
            </div>
            <Separator className="my-4"/>
            <div>
                
            </div>
            <div className="text-2xl font-bold flex gap-1 my-2 mx-2">Exclusive:<IndianRupee className="h-5 w-5 mt-2" /> <div className="my-auto">230 </div><div className="text-sm font-normal my-auto mt-2">/ week</div></div>

        </div>
    </div>

    </div>
  )
}

export default Venue