import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SelectScrollable } from "./SelectKindOf";
import MultipleImageUpload from "./MultipleImageUpload";

const RegisterVenue = () => {
  const FormSchema = z.object({
    venuename: z.string().min(2, {
      message: "Valid name is required.",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      venuename: "",
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-8  shadow-lg rounded-md mt-10 mb-10">
      <h1 className="text-3xl  mb-2 text-center">Register Your Venue</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className=" space-y-6">
          <FormField
            control={form.control}
            name="venuename"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue Name</FormLabel>
                <FormControl>
                  <Input placeholder="Type you name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mb-6">
            <Label
              htmlFor="propertyType"
              className="block text-sm font-medium "
            >
              Kind of Property:
            </Label>
            <SelectScrollable />
          </div>
          <div className="mb-6">
            <Label htmlFor="address" className="block text-sm font-medium ">
              Address:
            </Label>
            <div className="flex justify-between mt-1">
              <Textarea
                placeholder="Enter venue address"
                id="message"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
          </div>
          <div className="mb-6">
            <Label className="block text-sm font-medium my-2">
              Upload Images of Your Property:
            </Label>
            <MultipleImageUpload />
          </div>
          <div className="my-3">
            <Label htmlFor="message" className="block text-sm font-medium ">
              Rules and Regulations of Your Property:
            </Label>
            <Textarea
              placeholder="Start typing..."
              id="message"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterVenue;
