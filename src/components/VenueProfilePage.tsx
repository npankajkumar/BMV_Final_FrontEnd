import VenueProfilePageCard from "./VenueProfilePageCard";

const VenueProfilePage = () => {
  return (
    <div className="h-full p-6 pt-2 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold">Your Venues : </h1>
      <div className="flex justify-around flex-wrap">
        <VenueProfilePageCard
          venueName="Sunset Boulevard"
          city="Hyderabad"
          imageUrl="https://example.com/sunset-boulevard.jpg"
          providerName="Ganesh bookings"
          address="kukatpally"
        />
      </div>
    </div>
  );
};

export default VenueProfilePage;
