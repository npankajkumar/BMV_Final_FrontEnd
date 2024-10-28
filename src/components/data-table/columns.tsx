"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import LoadingButton from "../LoadingButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

export type Slot = {
  id: string;
  weekdayPrice: number;
  weekendPrice: number;
  status: "available" | "blocked";
  from: string;
  to: string;
};

const FormSchema = z.object({
  status: z.string(),
  weekdayPrice: z.any(),
  weekendPrice: z.any(),
});

const EditButton = ({
  updateProvider,
  slotId,
  status,
  weekdayPrice,
  weekendPrice,
}: {
  updateProvider: any;
  slotId: number;
  status: string;
  weekdayPrice: number;
  weekendPrice: number;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: status,
      weekdayPrice: weekdayPrice,
      weekendPrice: weekendPrice,
    },
  });

  const [slotEditLoading, setSlotEditLoading] = useState<boolean>(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setSlotEditLoading(true);
    // setTimeout(() => {}, 2000);
    axios
      .put(`http://localhost:5059/api/Slot/${slotId}`, {
        isBlocked: data.status == "blocked",
        weekdayPrice: data.weekdayPrice,
        weekendPrice: data.weekendPrice,
      })
      .then((res) => {
        setSlotEditLoading(false);
        updateProvider();
        toast({ title: "Slot Edited" });
      })
      .catch((err) => {
        toast({ title: "Error occurred", description: err });
        setSlotEditLoading(false);
      });
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">
    //         {JSON.stringify(data, null, 2)}
    //         <div>{data.status == "blocked" ? "true" : "false"}</div>
    //       </code>
    //     </pre>
    //   ),
    // });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Slot</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="weekdayPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weekday Price</FormLabel>
                  <FormControl>
                    <Input placeholder="1000" {...field} />
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
                  <FormLabel>Weekend Price</FormLabel>
                  <FormControl>
                    <Input placeholder="1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 justify-around">
              <LoadingButton type="submit" loading={slotEditLoading}>
                Save
              </LoadingButton>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
