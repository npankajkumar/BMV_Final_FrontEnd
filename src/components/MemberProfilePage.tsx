import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Dialog,
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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { toast } from "@//hooks/use-toast"

const FormSchema = z.object({
  name: z.string().min(1, {message:"Name is required"}),
  email: z.string().email({message:"Not a valid email"}),
  phone: z.string().regex(new RegExp("[0-9]{10}"),{message:"Not a valid phone number"})
})

const MemberProfilePage = ({
  className,
  name,
  email,
  phone,
}: {
  className?:string
  name: string;
  email: string;
  phone: string;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone:"",
      email:""
    },
  })
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })}
  return (
    <div className={"h-full p-6 pt-2 bg-white  rounded-lg" + className}>
      <h2 className="text-xl font-bold mb-3 text-left text-gray-800">
        Your Profile :
      </h2>

      <div className="flex justify-between space-x-6 w-[80%]">
        <div className="flex-1 space-y-3">

          <div className="p-2 bg-gray-50 rounded-md shadow-sm">
            <span className="block text-sm font-medium mb-1">
              Name
            </span>
            <span className="block text-base ">{name}</span>
          </div>

          <div className="p-2 bg-gray-50 rounded-md shadow-sm">
            <span className="block text-sm font-medium  mb-1">
              Email
            </span>
            <span className="block text-base ">{email}</span>
          </div>

          <div className="p-2 bg-gray-50 rounded-md shadow-sm">
            <span className="block text-sm font-medium mb-1">
              Phone
            </span>
            <span className="block text-base ">{phone}</span>
          </div>
        </div>

        <div className="pl-16 flex flex-col items-start justify-around p-4">
          <Avatar className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center shadow-lg">
            <AvatarFallback className="text-lg text-gray-700">
              <Label className="text-3xl font-bold">
                {name[0]}
              </Label>
            </AvatarFallback>
          </Avatar>
          <div className="">
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
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="phone no" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
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
