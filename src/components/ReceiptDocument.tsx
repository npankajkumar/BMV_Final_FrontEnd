import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { flexDirection: "column", backgroundColor: "#FFFFFF", padding: 20 },
  section: { margin: 10, padding: 10, flexGrow: 1 },
  header: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  row: { flexDirection: "row", marginBottom: 10 },
  label: { fontSize: 14, fontWeight: "bold", width: "30%" },
  value: { fontSize: 14, width: "70%" },
  signature: { marginTop: 30, textAlign: "right", fontSize: 14 },
  paid: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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

const ReceiptDocument = ({ booking }: { booking: Booking }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Booking Receipt</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Booking ID:</Text>
          <Text style={styles.value}>{booking.id}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Created At:</Text>
          <Text style={styles.value}>{booking.createdAt}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{booking.status}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Customer Name:</Text>
          <Text style={styles.value}>{booking.customerName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Provider Name:</Text>
          <Text style={styles.value}>{booking.providerName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Venue Name:</Text>
          <Text style={styles.value}>{booking.venueName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>{booking.amount}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{booking.date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Start Time:</Text>
          <Text style={styles.value}>{booking.start}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>End Time:</Text>
          <Text style={styles.value}>{booking.end}</Text>
        </View>
        <Text style={styles.paid}>PAID</Text>
      </View>
    </Page>
  </Document>
);

export default ReceiptDocument;
