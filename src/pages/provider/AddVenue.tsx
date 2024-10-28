import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Check, ChevronsUpDown, Upload } from "lucide-react";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FormSchema = z.object({
  name: z.string().min(3).max(60),
  city: z.string().min(2),
  description: z.string().min(10).max(200),
  address: z.string().min(10).max(200),
  latitude: z.string(),
  longitude: z.string(),
  category: z.string(),
  geoLocation: z.boolean().default(false),
  otherCategory: z.string().optional(),
  openingTime: z.string(),
  closingTime: z.string(),
  duration: z.string(),
  weekdayPrice: z.string().transform((val) => parseFloat(val)),
  weekendPrice: z.string().transform((val) => parseFloat(val)),
});

export default function AddVenue({
  provider,
  updateProvider,
}: {
  provider: any;
  updateProvider: any;
}) {
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

  const [addLoading, setAddLoading] = useState(false);
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
      latitude: data.latitude,
      longitude: data.longitude,
      category:
        data.category === "Others" ? data.otherCategory : data.category || "",
      slotDetails: {
        openingTime: data.openingTime,
        closingTime: data.closingTime,
        durationInMinutes: convertToMinutes(data.duration),
        weekdayPrice: data.weekdayPrice,
        weekendPrice: data.weekendPrice,
      },
    };

    const formData = new FormData();
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("images", imageFiles[i]);
    }
    Object.entries(resData).forEach(([key, value]) => {
      if (typeof value === "object") {
        Object.entries(value).forEach(([subKey, subValue]) => {
          formData.append(`${key}[${subKey}]`, subValue?.toString() ?? "");
        });
      } else {
        formData.append(key, value?.toString() ?? "");
      }
    });

    axios
      .post("http://localhost:5059/api/Venues", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("id_token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        toast({ title: "Venue Created" });
        setAddLoading(false);
        axios
          .post("http://localhost:5143/api/Search", {
            venueId: response.data.id,
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
      .catch((error) => {
        console.log(error);
        toast({ title: "Error occurred" });
        setAddLoading(false);
      });
  }

  if (geoLocationWatch) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        form.setValue("latitude", latitude.toString());
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
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Add Venue</CardTitle>
          <CardDescription>
            Fill in the details to add a new venue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Name <span className="text-primary">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your venue name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          City <span className="text-primary">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the venue city"
                            {...field}
                          />
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
                        <FormLabel>
                          Description <span className="text-primary">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Let the users know something about your venue"
                            {...field}
                          />
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
                        <FormLabel>
                          Address <span className="text-primary">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter the complete address of your venue"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="latitude"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>
                            Latitude <span className="text-primary">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="7328.8932"
                              {...field}
                              disabled={geoLocationWatch}
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
                        <FormItem className="flex-1">
                          <FormLabel>
                            Longitude <span className="text-primary">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="7328.8932"
                              {...field}
                              disabled={geoLocationWatch}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="geoLocation"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
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
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="flex flex-col ">
                        <FormLabel className="my-1">
                          Category <span className="text-red-600">*</span>
                        </FormLabel>
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
                            <Input placeholder="Custom Category" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Slot Creation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="openingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Venue Opening Time{" "}
                          <span className="text-primary">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a venue opening time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {generateTimeSlots().map((time) => (
                              <SelectItem key={time.value} value={time.value}>
                                {time.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="closingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Venue Closing Time{" "}
                          <span className="text-primary">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a venue closing time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {generateTimeSlots(openingTimeWatch).map((time) => (
                              <SelectItem key={time.value} value={time.value}>
                                {time.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Duration <span className="text-primary">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {generateDurations().map((time) => (
                            <SelectItem key={time.value} value={time.value}>
                              {time.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="weekdayPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Weekday Price <span className="text-primary">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your weekday price"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="weekendPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Weekend Price <span className="text-primary">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your weekend price"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormItem>
                  <FormLabel>
                    Upload Images <span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex p-5 items-center justify-start w-full  border-2 border-dashed rounded-lg cursor-pointer hover:bg-slate-100  dark:bg-black dark:hover:bg-gray-900 "
                      >
                        <Upload className="w-8 h-8 mr-4 text-primary" />
                        <input
                          id="dropzone-file"
                          type="file"
                          className=""
                          multiple
                          onChange={handleOnChange}
                        />
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
              <div className="flex justify-end space-x-4">
                <Link to="/">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <LoadingButton type="submit" loading={addLoading}>
                  Add Venue
                </LoadingButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

function convertToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}
