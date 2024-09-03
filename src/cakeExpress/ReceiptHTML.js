import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ReceiptHTML = ({ order }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receipt</Text>
      <Text>Order ID: {order.order_id}</Text>
      <Text>Customer Name: {order.customer_name}</Text>
      <Text>Delivery Address: {order.delivery_address}</Text>
      <Text>Phone Number: {order.phone_number}</Text>
      <Text>Cake Type: {order.cake_type}</Text>
      <Text>Cake Size: {order.cake_size}</Text>
      <Text>Special Requests: {order.special_requests}</Text>
      <Text>Advanced Payment: ${order.advanced_payment}</Text>
      <Text>Balance Payment: ${order.balance_payment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cccccc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ReceiptHTML;
