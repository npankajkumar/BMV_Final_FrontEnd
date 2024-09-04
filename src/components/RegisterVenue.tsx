import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SelectScrollable } from "./SelectKindOf";

const RegisterVenue = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-8 mb-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Register Your Venue
      </h1>
      <div className="mb-4">
        <Label
          htmlFor="propertyName"
          className="block text-base font-medium text-gray-700"
        >
          Property Name:
        </Label>
        <Input
          type="text"
          id="propertyName"
          placeholder="Enter your property name"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10"
        />
      </div>
      <div className="mb-4">
        <Label
          htmlFor="propertyType"
          className="block text-base font-medium text-gray-700"
        >
          Kind of Property:
        </Label>
        <SelectScrollable />
      </div>
      <div className="mb-4">
        <Label
          htmlFor="address"
          className="block text-base font-medium text-gray-700"
        >
          Address:
        </Label>
        <Input
          type="text"
          id="address"
          placeholder="Enter the address of your property"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10"
        />
      </div>
      <div className="mb-4">
        <Label
          htmlFor="picture"
          className="block text-base font-medium text-gray-700"
        >
          Upload images of your Property:
        </Label>
        <Input
          id="picture"
          type="file"
          multiple
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 h-14"
        />
      </div>
      <div className="mb-4">
        <Label
          htmlFor="message"
          className="block text-base font-medium text-gray-700"
        >
          Rules and Regulations of your property:
        </Label>
        <Textarea
          placeholder="Start typing..."
          id="message"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="text-center">
        <Button
          variant="outline"
          className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 h-9 text-base"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default RegisterVenue;
