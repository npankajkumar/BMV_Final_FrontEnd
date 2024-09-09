import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const Register = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-w-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>

      <div className="grid gap-3">
        <div className="grid gap-1">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            id="firstName"
            placeholder="Type your First Name"
            className="p-2 border rounded"
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            id="lastName"
            placeholder="Type your Last Name"
            className="p-2 border rounded"
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            type="tel"
            id="mobile"
            placeholder="Type your Mobile Number"
            className="p-2 border rounded"
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Type your Email"
            className="p-2 border rounded"
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Type your password"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex justify-center items-center mt-1">
          <Label>Already have an account?</Label>
          <Button variant="link" className="text-primary">
            Login
          </Button>
        </div>
        <Button className="bg-primary text-white p-2 rounded mt-1 shadow-md font-semibold text-md">
          Register
        </Button>
      </div>
    </div>
  );
};
