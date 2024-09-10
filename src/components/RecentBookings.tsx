import RecentBookingPerson from "./RecentBookingPerson";

const RecentBookings = () => {
  return (
    <div className="p-5 border rounded-lg bg-card text-card-foreground shadow">
      <h1 className="text-2xl font-semibold mb-4 border-b pb-2">
        Recent Bookings
      </h1>
      <div className="space-y-4">
        <RecentBookingPerson
          name="Niketh Donthula"
          phoneNumber="8247373288"
          amount={3000}
        />
        <RecentBookingPerson
          name="Sathvik Kolla"
          phoneNumber="1234567890"
          amount={3500}
        />
      </div>
    </div>
  );
};

export default RecentBookings;
