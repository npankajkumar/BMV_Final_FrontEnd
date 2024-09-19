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
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [client, setClient] = useState("customers");

  const navigate = useNavigate();

  let redirect = new URLSearchParams(useLocation().search).get("redirect");

  const FormSchema = z.object({
    email: z.string().email({ message: "This is not a valid email." }),
    password: z.string().min(1, { message: "Password is required" }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoginLoading(true);
    axios
      .post(`http://localhost:5059/api/${client}/login`, data)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("authToken", token);
        localStorage.setItem(
          "auth",
          client == "customers" ? "user" : "provider"
        );
        toast({ title: "Logged in" });
        if (redirect) {
          navigate(`/${redirect}`);
        } else {
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
        toast({ title: "Invalid Credentials", variant: "destructive" });
      });
    setLoginLoading(false);
  }

  return (
    <div className="p-6 rounded-lg border border-gray-200 w-[400px] max-w-lg border-t-0">
      <h1 className="text-3xl font-semi-bold mb-4 text-center">Login</h1>

      <RadioGroup defaultValue="default" className="flex justify-center mb-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="default"
            id="r1"
            onClick={() => {
              setClient("customers");
            }}
          />
          <Label htmlFor="r1">User</Label>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <RadioGroupItem
            value="comfortable"
            id="r2"
            onClick={() => {
              setClient("providers");
            }}
          />
          <Label htmlFor="r2">Provider</Label>
        </div>
      </RadioGroup>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
                    placeholder="Type your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-start items-center mt-1">
            <Label>Don't have an account?</Label>
            <Link to={"/register"}>
              <Button variant="link" className="text-primary">
                Register
              </Button>
            </Link>
          </div>
          <LoadingButton
            type="submit"
            loadingTitle="Submit"
            loading={loginLoading}
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
