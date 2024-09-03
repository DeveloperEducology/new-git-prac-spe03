import * as React from "react";
import { View, StyleSheet, Button, Platform, Text } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

export default function PrintToPdf({ route }) {
  // const { cakeOrder } = route.params;
  const [selectedPrinter, setSelectedPrinter] = React.useState(null);

  const cakeOrder = {
    orderId: "1725347020627",
    senderName: "Sheetal",
    senderPhoneNumber: "9347838726",
    receiverName: "Sravan",
    receiverPhoneNumber: "9347838726",
    shippingAddress: "D 1002 Aparna towers kondapur floor 10th, Hyderabad, 500084",
    cakeName: "Football Player Cake",
    flavor: "Light Chocolate",
    weight: "1 Kg",
    messageOnCard: "Happy Birthday Rudhwikram",
    specialInstructions: "",
    quantity: 1,
    price: 1200,
    advance_payment: 1000,
    balance_payment: 1500,
    order_date: "03-09-2024",
    deliveryDate: "03-09-2024",
    agentName: "Vijay Admin",
  };

  const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        h1, h2 {
          text-align: center;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
        }
        .content {
          display: flex;
          justify-content: space-between;
        }
        .left, .right {
          width: 48%;
        }
        .footer {
          margin-top: 40px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Flavours Guru</h1>
        <h2>Dispatch Note #${cakeOrder.orderId}</h2>
      </div>
      <div class="content">
        <div class="left">
          <p><strong>Shipping Details</strong></p>
          <p>Shipping Address: ${cakeOrder.shippingAddress}</p>
          <p>Receiver Name: ${cakeOrder.receiverName}</p>
          <p>Contact Number: ${cakeOrder.receiverPhoneNumber}</p>
          <p><strong>Order ID:</strong> ${cakeOrder.orderId}</p>
          <p><strong>Order Date:</strong> ${cakeOrder.order_date}</p>
          <p><strong>Sender Name:</strong> ${cakeOrder.senderName}</p>
        </div>
        <div class="right">
          <p><strong>Cake Details</strong></p>
          <p>Cake Name: ${cakeOrder.cakeName}</p>
          <p>Flavor: ${cakeOrder.flavor}</p>
          <p>Weight: ${cakeOrder.weight}</p>
          <p>Quantity: ${cakeOrder.quantity}</p>
        </div>
      </div>
      <div class="footer">
        <p><strong>Message on Card:</strong> ${cakeOrder.messageOnCard}</p>
        <p><strong>Special Instructions:</strong> ${cakeOrder.specialInstructions}</p>
        <p><strong>Customer Sign & Name:</strong></p>
        <p><strong>Delivery Time:</strong></p>
      </div>
    </body>
  </html>
  `;

  const print = async () => {
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    const { uri } = await Print.printToFileAsync({ html });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  return (
    <View style={styles.container}>
      <Button title="Print" onPress={print} />
      <View style={styles.spacer} />
      <Button title="Print to PDF file" onPress={printToFile} />
      {Platform.OS === "ios" && (
        <>
          <View style={styles.spacer} />
          <Button title="Select printer" onPress={selectPrinter} />
          <View style={styles.spacer} />
          {selectedPrinter && (
            <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    flexDirection: "column",
    padding: 8,
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: "center",
  },
});
