import VenuePageHeader from "@/components/VenuePageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronsUpDown, Star } from "lucide-react";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { availableSlots, categories } from "@/db";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "@/components/data-table/columns";
import LoadingButton from "@/components/LoadingButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Venue = ({
  provider,
  updateProvider,
}: {
  provider: any;
  updateProvider: any;
}) => {
  const [venueSaveLoading, setVenueSaveLoading] = useState<boolean>(false);
  let { id } = useParams();
  const venue = provider.venues.find((v: any) => v.id == id);
  const slots = venue
    ? venue.slots.map((s: any) => {
        return {
          id: s.id,
          weekdayPrice: s.weekdayPrice,
          weekendPrice: s.weekendPrice,
          status: s.isBlocked ? "blocked" : "available",
          from: s.start,
          to: s.end,
        };
      })
    : [];
  const navigate = useNavigate();
  const route = useLocation().pathname;
  const [category, setCategory] = useState();

  useEffect(() => {
    getCategoryById(venue.categoryId).then((c) => setCategory(c.name));
  }, []);

  const handleVenueSaveClick = (data: any) => {
    const reqData = {
      name: data.name,
      description: data.description,
      address: data.address,
      city: data.city,
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      category: data.category == "others" ? data.otherCategory : data.category,
    };
  };

  const FormSchema = z.object({
    name: z.string({ required_error: "Name is required" }).min(3, {
      message: "Name must be at least 3 characters.",
    }),
    city: z.string({ required_error: "Name is reuired" }).min(2, {
      message: "City must be at least 2 characters.",
    }),
    address: z
      .string({ required_error: "Address is required" })
      .min(10, {
        message: "Address must be at least 10 characters.",
      })
      .max(100, { message: "Address must be less than 100 characters." }),
    latitude: z.string(),
    longitude: z.string(),
    category: z.string({ required_error: "Category is required" }),
    geoLocation: z.boolean().default(false).optional(),
    otherCategory: z.string().optional(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: venue.name,
      city: venue.city,
      address: venue.address,
      latitude: venue.latitude,
      longitude: venue.longitude,
      category: category,
      geoLocation: false,
      otherCategory: "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setVenueSaveLoading(false);
    axios
      .put(
        `http://localhost:5059/api/Venues/${id}`,
        {
          name: data.name,
          address: data.address,
          city: data.city,
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          category:
            data.category == "others" ? data.otherCategory : data.category,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then(() => {
        toast({ title: "Edited" });
        setVenueSaveLoading(false);
        updateProvider();
      })
      .catch(() => {
        toast({ title: "Error occured" });
      });
  }
  const categoryWatch = form.watch("category");
  const geoLocationWatch = form.watch("geoLocation");
  if (geoLocationWatch) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        form.setValue("latitude", latitude.toString());
        form.reset;
        form.setValue("longitude", longitude.toString());
      },
      (error) => {
        form.resetField("geoLocation");
        form.resetField("latitude");
        form.resetField("longitude");
      }
    );
  }
  return venue ? (
    <div className="p-4">
      <div className=" grid grid-cols-2 space-y-0.5">
        <div className="flex flex-col gap-2 justify-center">
          <h2 className="text-2xl font-bold tracking-tight">{venue.name}</h2>
          <div className="flex gap-2">
            <h3 className="text-xl tracking-tight mb-1">{provider.name}</h3>
            <Separator orientation="vertical" />
            <p className="flex gap-2 my-auto">
              {venue.rating} <Star className="w-4 h-4 my-auto text-primary" />
            </p>
            <Separator orientation="vertical" />
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className="px-4 py-1 h-10 bg-primary text-white font-semibold rounded-lg shadow hover:bg-red-500 hover:text-white transition duration-200"
                >
                  Edit Details
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle>Edit Venue</DialogTitle>
                  <DialogDescription>
                    Make changes to your venue here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-80">
                  <Form {...form}>
                    <form
                      className="space-y-4"
                      onSubmit={form.handleSubmit(onSubmit)}
                    >
                      <div className="my-2 flex justify-between"></div>
                      <div className="my-2 grid grid-cols-1 min-h-full">
                        <div className="px-2">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormDescription>
                                  This is your venue public display name.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="Hyderabad" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {
                            <div className="flex justify-around min-w-full">
                              <FormField
                                control={form.control}
                                name="latitude"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Latitude</FormLabel>
                                    <FormControl>
                                      <Input
                                        disabled={geoLocationWatch}
                                        type="number"
                                        placeholder="7328.8932"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="longitude"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Longitude</FormLabel>
                                    <FormControl>
                                      <Input
                                        disabled={geoLocationWatch}
                                        type="number"
                                        placeholder="7328.8932"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          }
                          <FormField
                            control={form.control}
                            name="geoLocation"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 my-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Use current location</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          <div className="flex gap-2">
                            <FormField
                              control={form.control}
                              name="category"
                              render={({ field }) => (
                                <FormItem className="flex flex-col ">
                                  <FormLabel className="my-1">
                                    Category
                                  </FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant="outline"
                                          role="combobox"
                                          className={cn(
                                            "w-[200px] justify-between",
                                            !field.value &&
                                              "text-muted-foreground"
                                          )}
                                        >
                                          {field.value
                                            ? categories.find(
                                                (c) => c === field.value
                                              )
                                            : "Select category"}
                                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0 w-[200px]">
                                      <Command>
                                        <CommandInput placeholder="Search categories..." />
                                        <CommandList>
                                          <CommandEmpty>
                                            No categry found.
                                          </CommandEmpty>
                                          <CommandGroup>
                                            {categories.map((c) => (
                                              <CommandItem
                                                value={c}
                                                key={c}
                                                onSelect={() => {
                                                  form.setValue("category", c);
                                                }}
                                              >
                                                <Check
                                                  className={cn(
                                                    "mr-2 h-4 w-4",
                                                    c === field.value
                                                      ? "opacity-100"
                                                      : "opacity-0"
                                                  )}
                                                />
                                                {c}
                                              </CommandItem>
                                            ))}
                                          </CommandGroup>
                                        </CommandList>
                                      </Command>
                                    </PopoverContent>
                                  </Popover>
                                  <FormDescription>
                                    This is used for search reults
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {categoryWatch == "others" && (
                              <FormField
                                control={form.control}
                                name="otherCategory"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Other Category</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Custom Category"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-around">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Close
                          </Button>
                        </DialogClose>
                        <LoadingButton type="submit" loading={venueSaveLoading}>
                          Save
                        </LoadingButton>
                      </div>
                    </form>
                  </Form>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-wrap">{venue.description}</p>
          <div className="flex gap-2">
            <Badge variant="outline" className="border-primary">
              {category}
            </Badge>
          </div>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="">
        <DataTable columns={columns} data={slots} />
      </div>
    </div>
  ) : (
    <div>Error occured</div>
  );
};

const Header = ({
  edit,
  onEditClick,
}: {
  edit: boolean;
  onEditClick: () => void;
}) => {
  const keywords = ["good", "keyword2", "keyword3", "keyword4", "keyword5"];
  return (
    <div>
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
            <Button className="bg-primary" onClick={onEditClick}>
              {edit ? "Cancel" : "Edit"}
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-wrap">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, quam
            iste nobis consequatur ea sit consequuntur tenetur? A, nemo magni
            quas reiciendis placeat sint laborum adipisci vitae voluptatum non
            dolorem!
          </p>
          <div className="flex gap-2">
            {keywords.map((keyword, i) => (
              <Badge key={i} variant="outline" className="border-primary">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const getCategoryById = async (id: number) => {
  const res = await axios.get(`http://localhost:5059/api/Category/${id}`);
  return res.data;
};

export default Venue;
