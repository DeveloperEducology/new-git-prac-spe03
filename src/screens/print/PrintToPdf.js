import * as React from "react";
import { View, StyleSheet, Button, Platform, Text } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

const cakeOrder = {
  orderId: "94336",
  senderName: "Sheetal",
  senderPhoneNumber: "9347838726",
  receiverName: "Sheetal",
  receiverPhoneNumber: "9347838726",
  shippingAddress:
    "D 1002 Aparna towers kondapur floor, 10th, Hyderabad, 500084",
  orderDate: "2024-03-25 22:26:26",
  productName: "Football Player Cake",
  productWeight: "1 Kg",
  productFlavor: "Light Chocolate",
  productMessage: "HappyBirthdayRudhwikram",
  productImage: "https://example.com/cake-image.png", // Replace with actual image URL
  shippingCity: "Hyderabad",
  shippingPincode: "500084",
  shippingDate: "26-03-2024",
  shippingType: "Standard Delivery",
  shippingTime: "09:00 - 21:00",
  shippingCost: "₹99",
  quantity: "1",
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
      .product {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
      }
      .product img {
        width: 80px;
        height: 80px;
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
        <p>Shipping address: ${cakeOrder.shippingAddress}</p>
        <p>Receiver name: ${cakeOrder.receiverName}</p>
        <p>Contact number: ${cakeOrder.receiverPhoneNumber}</p>
        <p><strong>Order ID:</strong> ${cakeOrder.orderId}</p>
        <p><strong>Order date:</strong> ${cakeOrder.orderDate}</p>
        <p><strong>Sender name:</strong> ${cakeOrder.senderName}</p>
      </div>
      <div class="right">
        <p><strong>Shipping Info</strong></p>
        <p>City: ${cakeOrder.shippingCity}</p>
        <p>Pincode: ${cakeOrder.shippingPincode}</p>
        <p>Shipping Date: ${cakeOrder.shippingDate}</p>
        <p>Shipping Type: ${cakeOrder.shippingType} - ${cakeOrder.shippingCost}</p>
        <p>Shipping Time: ${cakeOrder.shippingTime}</p>
        <p><strong>Quantity:</strong> ${cakeOrder.quantity}</p>
      </div>
    </div>
    <div class="product">
      <div>
        <p><strong>Product Name:</strong> ${cakeOrder.productName}</p>
        <p>Weight: ${cakeOrder.productWeight}</p>
        <p>Flavor: ${cakeOrder.productFlavor}</p>
        <p>Only 30 Characters allowed:</p>
        <p>${cakeOrder.productMessage}</p>
      </div>
      <div>
        <img src="${cakeOrder.productImage}" alt="Product Image" />
      </div>
    </div>
    <div class="footer">
      <p><strong>Message on card:</strong> ${cakeOrder.productMessage}</p>
      <p><strong>Special Instructions:</strong></p>
      <ul>
        <li>Product delivered in good condition</li>
        <li>All products delivered</li>
        <li>Satisfied with experience</li>
      </ul>
      <p><strong>Customer Sign & Name:</strong></p>
      <p><strong>Delivery time:</strong></p>
    </div>
  </body>
</html>
`;

export default function PrintToPdf() {



    
  const [selectedPrinter, setSelectedPrinter] = React.useState();

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
          {selectedPrinter ? (
            <Text
              style={styles.printer}
            >{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
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
