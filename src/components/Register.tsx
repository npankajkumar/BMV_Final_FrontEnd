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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import LoadingButton from "./LoadingButton";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

export const Register = () => {
  const [registerLoading, setRegisterLoading] = useState(false);
  const [client, setClient] = useState("customers");

  const navigate = useNavigate();

  let redirect = new URLSearchParams(useLocation().search).get("redirect");

  const FormSchema = z.object({
    name: z.string().min(1, {
      message: "Name is required.",
    }),
    email: z.string().email({ message: "This is not a valid email." }),
    mobile: z
      .string({ message: "Phone number is required" })
      .regex(new RegExp("[0-9]{10}"), { message: "Not a valid phone number" }),
    password: z.string().min(1, { message: "Password required" }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setRegisterLoading(true);
    console.log(data);
    axios
      .post(`http://localhost:5059/api/${client}/register`, data)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("authToken", token);
        localStorage.setItem(
          "auth",
          client == "customers" ? "user" : "provider"
        );
        toast({ title: "Registered" });
        if (redirect) {
          navigate(`/${redirect}`);
        } else {
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
        toast({ title: "Invalid details", variant: "destructive" });
      });
    setRegisterLoading(false);
  }
  return (
    <div className="max-w-md mx-auto p-8 flex flex-col rounded-md mt-5 mb-10 border border-gray-200 border-t-0">
      <h1 className="text-3xl mb-2 text-center">Register</h1>
      <RadioGroup
        defaultValue="default"
        className="flex justify-center mb-4 mt-2 w-full"
      >
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Type you name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Type your Email" type="text" {...field} />
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type your phone number"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Set your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-start items-center mt-1">
            <Label>Already have an account?</Label>
            <Link to={"/login"}>
              <Button variant="link" className="text-primary">
                Login
              </Button>
            </Link>
          </div>
          <LoadingButton
            type="submit"
            loadingTitle="Submit"
            loading={registerLoading}
            variant={"outline"}
            className="bg-primary w-full text-white p-2  mt-1 shadow-md font-semibold text-md"
          >
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
};
