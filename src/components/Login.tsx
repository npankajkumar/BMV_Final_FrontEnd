import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const Login = () => {
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

      <div className="grid gap-3">
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
          <Label>Don't have an account?</Label>
          <Button variant="link" className="text-primary">
            Register
          </Button>
        </div>
        <Button className="bg-primary text-white p-2 rounded mt-1 shadow-md font-semibold text-md">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
