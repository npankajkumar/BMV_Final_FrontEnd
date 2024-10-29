import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import LoadingButton from "./LoadingButton";
import { useBmv } from "@/contexts/bmvContext";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, Mail, Phone, User, BookUser } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  mobile: z
    .string()
    .regex(/^[9876]\d{9}$/, { message: "Invalid mobile number" }),
});

export default function MemberProfilePage({
  className = "",
  name,
  email,
  mobile,
  onProfileUpdate,
}: {
  className?: string;
  name: string;
  email: string;
  mobile: string;
  onProfileUpdate: (updatedData: { name: string; mobile: string }) => void;
}) {
  const [profileSaveLoading, setProfileSaveLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { role, token } = useBmv();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: name,
      mobile: mobile,
    },
  });

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setProfileSaveLoading(true);
    try {
      const url =
        role === "customer"
          ? "http://localhost:5059/api/Customers"
          : "http://localhost:5059/api/Providers";

      await axios.put(
        url,
        {
          name: data.name,
          email: email,
          mobile: data.mobile,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        className: "border-2 border-primary",
        title: "Profile Edited Successfully",
      });

      onProfileUpdate({
        name: data.name,
        mobile: data.mobile,
      });

      handleDialogClose();
    } catch (error) {
      toast({
        className: "border-2 border-primary",
        title: "Couldn't update profile",
      });
    } finally {
      setProfileSaveLoading(false);
    }
  }

  return (
    <div className={`w-full bg-background text-foreground p-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-4xl font-semibold mb-8 text-center text-gray-900 dark:text-slate-100"
          style={{ fontFamily: "Montserrat" }}
        >
          Your Profile
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="col-span-1">
            <CardContent className="p-6 flex flex-col items-center justify-between space-y-4 h-full">
              <Avatar className="h-40 w-40 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center shadow-lg">
                <AvatarFallback
                  className="text-6xl font-bold text-gray-900 dark:text-slate-100"
                  style={{ fontFamily: "Montserrat" }}
                >
                  {name[0]}
                </AvatarFallback>
              </Avatar>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="default"
                    className="w-full max-w-xs h-12 flex items-center justify-center gap-2 text-base"
                    onClick={handleDialogOpen}
                  >
                    <Edit2 className="w-5 h-5" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Name <span className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your name" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Mobile Number{" "}
                              <span className="text-red-600">*</span>
                            </FormLabel>
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
                      <div className="flex justify-end gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleDialogClose}
                        >
                          Cancel
                        </Button>
                        <LoadingButton
                          type="submit"
                          loading={profileSaveLoading}
                        >
                          Save Changes
                        </LoadingButton>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          <Card className="col-span-1 md:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <User className="w-6 h-6 text-primary" />
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Name
                  </Label>
                  <div className="text-lg font-medium">{name}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Email
                  </Label>
                  <div className="text-lg font-medium">{email}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <Phone className="w-6 h-6 text-primary" />
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Mobile
                  </Label>
                  <div className="text-lg font-medium">{mobile}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
