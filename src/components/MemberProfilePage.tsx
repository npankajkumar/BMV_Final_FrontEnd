import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@//hooks/use-toast";
import { useState } from "react";
import LoadingButton from "./LoadingButton";
import axios from "axios";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  mobile: z.string().min(1, { message: "mobile number required" }),
});

const MemberProfilePage = ({
  className,
  name,
  email,
  mobile,
  onProfileUpdate,
}: {
  className?: string;
  name: string;
  email: string;
  mobile: string;
  onProfileUpdate: (updatedData: {
    name: string;
    mobile: string;
  }) => void;
}) => {
  const [profileSaveLoading, setProfileSaveLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [url, setUrl] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: name,
      mobile: mobile,
    },
  });

  

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setProfileSaveLoading(true);
    setTimeout(() => {
      setProfileSaveLoading(false);
    }, 1000);

    if (localStorage.getItem("auth") == "user") {
      setUrl("http://localhost:5059/api/Customers");
    }
    if (localStorage.getItem("auth") == "provider") {
      setUrl("http://localhost:5059/api/Providers");
    }
    axios
      .put(
        url,
        {
          name: data.name,
          email: email,
          mobile: data.mobile,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then(() => {
        toast({
          className: "border-2 border-primary",
          title: "Profile Edited Successfully",
        });
        console.log("hi");
        onProfileUpdate({
          name: data.name,
          mobile: data.mobile,
        });
        handleDialogClose();
      })
      .catch(() => {
        toast({
          className: "border-2 border-primary",
          title: "Couldn't update profile",
        });
      });
  }

  return (
    <div className={"h-full p-6 pt-2 bg-white  rounded-lg" + className}>
      <h2 className="text-xl font-bold mb-3 text-left text-gray-800">
        Your Profile :
      </h2>
      <div className="flex justify-between space-x-6 w-[80%]">
        <div className="flex-1 space-y-3">
          <div className="p-2 bg-gray-50 rounded-md shadow-sm">
            <span className="block text-sm font-medium mb-1">Name</span>
            <span className="block text-base ">{name}</span>
          </div>
          <div className="p-2 bg-gray-50 rounded-md shadow-sm">
            <span className="block text-sm font-medium  mb-1">Email</span>
            <span className="block text-base ">{email}</span>
          </div>
          <div className="p-2 bg-gray-50 rounded-md shadow-sm">
            <span className="block text-sm font-medium mb-1">mobile</span>
            <span className="block text-base ">{mobile}</span>
          </div>
        </div>

        <div className="pl-16 flex flex-col items-start justify-around p-4">
          <Avatar className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center shadow-lg">
            <AvatarFallback className="text-lg text-gray-700">
              <Label className="text-3xl font-bold">{name[0]}</Label>
            </AvatarFallback>
          </Avatar>
          <div className="">
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
              <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your public display name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>mobile Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter mobile number"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <LoadingButton type="submit" loading={profileSaveLoading}>
                      Submit
                    </LoadingButton>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfilePage;
