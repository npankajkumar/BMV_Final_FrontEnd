import RecentBookingPerson from "./RecentBookingPerson";

const RecentBookings = ({ bookings }: { bookings: any[] }) => {
  return (
    <div className="p-5 border rounded-lg bg-card text-card-foreground shadow">
      <h1 className="text-2xl font-semibold mb-4 border-b pb-2">
        Recent Earnings
      </h1>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <RecentBookingPerson
            key={booking.id}
            name={booking.customerId}
            date={booking.createdAt}
            amount={booking.amount}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentBookings;
