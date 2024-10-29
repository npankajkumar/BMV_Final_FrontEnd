import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { backgroundColor: "#FFFFFF", padding: 30 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    padding: 10,
    borderBottom: 1,
    borderColor: "#000000",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  box: {
    border: 1,
    borderColor: "#000000",
    padding: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
    padding: 5,
  },
  alternateRow: {
    backgroundColor: "#f0f0f0",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    width: "40%",
  },
  value: {
    fontSize: 12,
    width: "60%",
  },
  paid: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    transform: "rotate(-15deg)",
    border: 4,
    borderColor: "#008000",
    backgroundColor: "#008000",
    color: "white",
    padding: 10,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#666666",
    borderTop: 1,
    borderColor: "#CCCCCC",
    paddingTop: 10,
  },
});

type Booking = {
  id: number;
  createdAt: string;
  status: string;
  customerId: number;
  providerId: number;
  venueId: number;
  amount: number;
  date: string;
  start: string;
  end: string;
  bookedSlots: [];
  customerName: string;
  providerName: string;
  venueName: string;
};

const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (timeString: string) => {
  const date = new Date(`1970-01-01T${timeString}`);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const ReceiptDocument = ({ booking }: { booking: Booking }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Booking Receipt</Text>
      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.label}>Booking ID:</Text>
          <Text style={styles.value}>{booking.id}</Text>
        </View>
        <View style={[styles.row, styles.alternateRow]}>
          <Text style={styles.label}>Generated At:</Text>
          <Text style={styles.value}>{`${date} ${time}`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{booking.status}</Text>
        </View>
      </View>
      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.label}>Customer Name:</Text>
          <Text style={styles.value}>{booking.customerName}</Text>
        </View>
        <View style={[styles.row, styles.alternateRow]}>
          <Text style={styles.label}>Provider Name:</Text>
          <Text style={styles.value}>{booking.providerName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Venue Name:</Text>
          <Text style={styles.value}>{booking.venueName}</Text>
        </View>
      </View>
      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>{formatCurrency(booking.amount)}</Text>
        </View>
        <View style={[styles.row, styles.alternateRow]}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{formatDate(booking.date)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Start Time:</Text>
          <Text style={styles.value}>{formatTime(booking.start)}</Text>
        </View>
        <View style={[styles.row, styles.alternateRow]}>
          <Text style={styles.label}>End Time:</Text>
          <Text style={styles.value}>{formatTime(booking.end)}</Text>
        </View>
      </View>
      <View style={styles.paid}>
        <Text>PAID</Text>
      </View>
      <Text style={styles.footer}>
        Thank you for your booking. For any questions, please contact our
        customer support.
      </Text>
    </Page>
  </Document>
);

export default ReceiptDocument;
