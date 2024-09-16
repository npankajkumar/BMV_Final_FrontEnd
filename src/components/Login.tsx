import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useState } from "react";
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
import LoadingButton from "./LoadingButton";

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false);

  const FormSchema = z.object({
    email: z.string().email({ message: "This is not a valid email." }),
    password: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Submission
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-w-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>

      <RadioGroup defaultValue="default" className="flex justify-center mb-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">User</Label>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Provider</Label>
        </div>
      </RadioGroup>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {})}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Type you Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type your Email"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            type="submit"
            loadingTitle="Submit"
            loading={loginLoading}
            onClick={() => {
              setLoginLoading(true);
            }}
            variant={"outline"}
            className="bg-primary w-full text-white p-2  mt-1 shadow-md font-semibold text-md"
          >
            Login
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
};

export default Login;
