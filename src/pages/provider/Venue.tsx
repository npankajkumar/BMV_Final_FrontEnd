import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronsUpDown, Star } from "lucide-react";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { categories } from "@/db";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/data-table/DataTable";
import LoadingButton from "@/components/LoadingButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useBmv } from "@/contexts/bmvContext";
import NotFound from "@/components/NotFound";

const Venue = ({
  provider,
  updateProvider,
}: {
  provider: any;
  updateProvider: any;
}) => {
  const [venueSaveLoading, setVenueSaveLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  const { token } = useBmv();

  let { id } = useParams();
  const venue = provider.venues.find((v: any) => v.id == id);
  if (!venue) {
    return <NotFound message="Venue" />;
  }
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
  const [category, setCategory] = useState();

  useEffect(() => {
    getCategoryById(venue.categoryId).then((c) => setCategory(c.name));
  }, []);

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
      .max(200, { message: "Address must be less than 200 characters." }),
    description: z
      .string({ required_error: "Description is required" })
      .min(10, {
        message: "Description must be atleast 10 characters.",
      })
      .max(200, { message: "Description must be less than 200 characters." }),
    latitude: z.string().regex(/^(-?(?:[1-8]?\d(?:\.\d+)?|90(?:\.0+)?))$/, {
      message: "Latitude must be between -90 and 90.",
    }),

    longitude: z
      .string()
      .regex(/^(-?(?:[1-9]?\d(?:\.\d+)?|1[0-7]\d(?:\.\d+)?|180(?:\.0+)?))$/, {
        message: "Longitude must be between -180 and 180.",
      }),
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
      description: venue.description,
      latitude: venue.latitude.toString(),
      longitude: venue.longitude.toString(),
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
          description: data.description,
          city: data.city,
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          category:
            data.category == "others" ? data.otherCategory : data.category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast({ title: "Venue Edited" });
        setVenueSaveLoading(false);
        updateProvider();
        handleDialogClose();
      })
      .catch((error) => {
        toast({ title: "Error occured", description: error.message });
        setVenueSaveLoading(false);
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
        console.log(error);
      }
    );
  }
  return venue ? (
    <div className="p-4">
      <div className=" grid grid-cols-2 space-y-0.5">
        <div className="flex flex-col gap-2 justify-center">
          <h2 className="text-2xl font-bold tracking-tight">{venue.name}</h2>
          <div className="flex gap-2">
            <h3 className="flex items-center text-xl tracking-tight mb-1">
              {provider.name}
            </h3>
            <Separator orientation="vertical" />
            <p className="flex items-center gap-2 my-auto">
              {Math.round(venue.rating * 10) / 10}
              <Star className="w-4 h-4 my-auto text-primary" fill="#e11c48" />
            </p>
            <Separator orientation="vertical" />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className="px-4 py-1 h-10 bg-primary text-white font-semibold rounded-lg shadow hover:bg-red-500 hover:text-white transition duration-200"
                  onClick={handleDialogOpen}
                >
                  Edit Details
                </Button>
              </DialogTrigger>
              <DialogContent className="md:w-[800px] w-[400px]">
                <DialogHeader>
                  <DialogTitle className="ml-3">Edit Venue</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-96 p-2 pr-3">
                  <Form {...form}>
                    <form
                      className="space-y-2"
                      onSubmit={form.handleSubmit(onSubmit)}
                    >
                      <div className="mb-2 grid grid-cols-1 min-h-full">
                        <div className="px-2">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Name
                                  <span className="text-red-600 ml-1">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your venue name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  This is your venue public display name.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="mt-2">
                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    City
                                    <span className="text-red-600 ml-1 ">
                                      *
                                    </span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter venue city"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="mt-2">
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Description
                                    <span className="text-red-600 ml-1">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Let users know something about your venue"
                                      {...field}
                                      className="h-28"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="mt-2">
                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Address
                                    <span className="text-red-600 ml-1">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Enter complete address of venue"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          {
                            <div className="flex justify-around min-w-full mt-2">
                              <FormField
                                control={form.control}
                                name="latitude"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Latitude
                                      <span className="text-red-600 ml-1">
                                        *
                                      </span>
                                    </FormLabel>
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
                                    <FormLabel>
                                      Longitude
                                      <span className="text-red-600 ml-1">
                                        *
                                      </span>
                                    </FormLabel>
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
                                    <span className="text-red-600 ml-1">*</span>
                                  </FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant="outline"
                                          role="combobox"
                                          className={cn(
                                            "w-[160px] justify-between",
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
                                    <PopoverContent className="p-0 w-[160px]">
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

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {categoryWatch == "Others" && (
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
                      <div className="flex gap-2 pt-4 justify-around">
                        <DialogClose asChild>
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={handleDialogClose}
                          >
                            Cancel
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
        <DataTable data={slots} updateProvider={updateProvider} />
      </div>
    </div>
  ) : (
    <div>Error occured</div>
  );
};

const getCategoryById = async (id: number) => {
  const res = await axios.get(`http://localhost:5059/api/Category/${id}`);
  return res.data;
};

export default Venue;
