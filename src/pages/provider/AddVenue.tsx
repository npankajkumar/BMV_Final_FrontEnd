import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { string, z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
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
import { Link, useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, ChevronsUpDown } from "lucide-react";
import { categories, generateDurations, generateTimeSlots } from "@/db";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import LoadingButton from "@/components/LoadingButton";
import { ReactHTMLElement, useEffect, useState } from "react";
import axios from "axios";

const FormSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3, {
    message: "Name must be at least 3 characters.",
  }),
  city: z.string({ required_error: "Name is reuired" }).min(2, {
    message: "City must be at least 2 characters.",
  }),
  description: z
    .string({ required_error: "Description is required" })
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(200, { message: "Description must be less than 200 characters." }),
  address: z
    .string({ required_error: "Address is required" })
    .min(10, {
      message: "Address must be at least 10 characters.",
    })
    .max(200, { message: "Address must be less than 200 characters." }),
  latitude: z.string(),
  longitude: z.string(),
  category: z.any(),
  geoLocation: z.boolean().default(false).optional(),
  otherCategory: z.string().optional(),
  openingTime: z.string().time(),
  closingTime: z.string().time(),
  duration: z.string(),
  weekdayPrice: z.string(),
  weekendPrice: z.string(),
});

export function InputForm() {}

const AddVenue = ({
  provider,
  updateProvider,
}: {
  provider: any;
  updateProvider: any;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      city: "",
      description: "",
      address: "",
      latitude: "",
      longitude: "",
      category: "",
      geoLocation: false,
      otherCategory: "",
      openingTime: "",
      closingTime: "",
      duration: "",
    },
  });

  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [imageFiles, setImageFiles] = useState([]);

  const categoryWatch = form.watch("category");
  const geoLocationWatch = form.watch("geoLocation");
  const openingTimeWatch = form.watch("openingTime");

  const navigate = useNavigate();

  function handleOnChange(event: any) {
    setImageFiles(event.target.files);
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setAddLoading(true);

    const resData = {
      name: data.name,
      description: data.description,
      address: data.address,
      city: data.city,
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      category:
        data.category == "others" ? data.otherCategory : data.category || "",
      slotDetails: {
        openingTime: data.openingTime,
        closingTime: data.closingTime,
        durationInMinutes: convertToMinutes(data.duration),
        weekdayPrice: parseFloat(data.weekdayPrice),
        weekendPrice: parseFloat(data.weekendPrice),
      },
    };
    console.log(resData);
    const formData = new FormData();
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("images", imageFiles[i]);
    }
    formData.append("name", resData.name);
    formData.append("description", resData.description);
    formData.append("address", resData.address);
    formData.append("city", resData.city);
    formData.append("latitude", resData.latitude.toString());
    formData.append("longitude", resData.longitude.toString());
    formData.append("category", resData.category);
    formData.append(
      "slotDetails[openingTime]",
      resData.slotDetails.openingTime
    );
    formData.append(
      "slotDetails[closingTime]",
      resData.slotDetails.closingTime
    );
    formData.append(
      "slotDetails[durationInMinutes]",
      resData.slotDetails.durationInMinutes.toString()
    );
    formData.append(
      "slotDetails[weekdayPrice]",
      resData.slotDetails.weekdayPrice.toString()
    );
    formData.append(
      "slotDetails[weekendPrice]",
      resData.slotDetails.weekendPrice.toString()
    );

    axios
      .post("http://localhost:5059/api/Venues", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((b) => {
        console.log(b);
        toast({ title: "Venue Created" });
        setAddLoading(false);
        axios
          .post("http://localhost:5143/api/Search", {
            venueId: b.data.id,
            venueName: resData.name,
            venueDescription: resData.description,
            venueCategory: resData.category,
            city: resData.city,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((e) => console.log(e));
        updateProvider();
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        toast({ title: "Error occured" });
        setAddLoading(false);
      });

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(resData, null, 2)}</code>
        </pre>
      ),
    });
  }

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

  return (
    <div className="p-4">
       <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="my-2 flex justify-between">
            <h3 className="text-2xl font-semibold">Add Venue</h3>
            <div className="flex gap-2">
              <Link to={"/"}>
                <Button variant={"outline"}>Cancel</Button>
              </Link>
              <LoadingButton type="submit" loading={addLoading}>
                Add
              </LoadingButton>
            </div>
          </div>
          <div className="my-2 grid grid-cols-1 lg:grid-cols-2">
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
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
                      <FormLabel className="my-1">Category</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? categories.find((c) => c === field.value)
                                : "Select category"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-[200px]">
                          <Command>
                            <CommandInput placeholder="Search categories..." />
                            <CommandList>
                              <CommandEmpty>No categry found.</CommandEmpty>
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
                          <Input placeholder="Custom Category" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
            <div className="px-2">
              <h3 className="text-xl font-semibold text-center my-4">
                Slot creation
              </h3>
              <div className="flex gap-2 justify-center">
                <div>
                  <FormField
                    control={form.control}
                    name="openingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue Opening Time</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a venue opening time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="h-40">
                            {generateTimeSlots().map((time) => {
                              return (
                                <SelectItem value={time.value}>
                                  {time.label}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Separator orientation="vertical" className="h-20" />
                <div>
                  <FormField
                    control={form.control}
                    name="closingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue Closing Time</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a venue closing time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="h-40">
                            {generateTimeSlots(openingTimeWatch).map((time) => {
                              return (
                                <SelectItem value={time.value}>
                                  {time.label}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="my-4">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="md:w-1/2 mx-auto">
                      <FormLabel>Duration</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="h-40">
                          {generateDurations().map((time) => {
                            return (
                              <SelectItem value={time.value}>
                                {time.label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-4 md:w-1/2 mx-auto">
                <FormField
                  control={form.control}
                  name="weekdayPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WeekdayPrice</FormLabel>
                      <FormControl>
                        <Input placeholder="1000" {...field} />
                      </FormControl>
                      <FormDescription>
                        You can change this later
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-4 md:w-1/2 mx-auto">
                <FormField
                  control={form.control}
                  name="weekendPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WeekdayPrice</FormLabel>
                      <FormControl>
                        <Input placeholder="1500" {...field} />
                      </FormControl>
                      <FormDescription>
                        You can change this later
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-4 mb-2 md:w-1/2 mx-auto">
                <label htmlFor="files" className="my-2">
                  Upload Files
                </label>
                <input
                  name="files"
                  type="file"
                  multiple
                  required
                  className="border p-3 rounded-md"
                  onChange={handleOnChange}
                />
              </div>
            </div>
          </div>
        </form>
      </Form> 
    </div>
  );
};

function convertToMinutes(timeString: string): number {
  // Split the time string into hours, minutes, and seconds
  const [hours, minutes] = timeString.split(":").map(Number);

  return (hours * 60) + minutes;
}

export default AddVenue;
