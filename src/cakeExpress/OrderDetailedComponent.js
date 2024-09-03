import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";

const OrderDetailedComponent = ({ order }) => {
  return (
    <ScrollView style={styles.orderContainer}>
      <View>
        <View
          style={{
            // paddingHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: order?.imageURL
                ? order?.imageURL
                : "https://www.hotbreads.co.in/cdn/shop/products/IMG_0013_1_1200x1200.jpg?v=1642654564",
            }}
            style={{ height: 300, width: 300 }}
          />
        </View>
        <View style={{ gap: 10 }}>
          <View style={{ backgroundColor: "#011a26", padding: 10 }}>
            <Text style={styles.orderText}>Order ID: {order?.order_id}</Text>
            <Text style={styles.orderText}>
              Sender Name: {order?.sender_name}
            </Text>
            <Text style={styles.orderText}>
              Sender Contact: {order?.sender_contact}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#011a26",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <Text style={styles.orderText}>
              Receiver Name: {order?.reciever_name}
            </Text>
            <Text style={styles.orderText}>
              Receiver Contact: {order?.reciever_contact}
            </Text>
            <Text style={styles.orderText}>
              Delivery Address: {order?.delivery_address}
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "#011a26", padding: 10 }}>
          <Text style={styles.orderText}>Cake Type: {order?.cake_type}</Text>
          <Text style={styles.orderText}>Cake Size: {order?.cake_size}</Text>

          <Text style={styles.orderText}>
            Special Requests: {order.special_requests}
          </Text>
          <Text style={styles.orderText}>
            Advanced Payment: ${order.advanced_payment}
          </Text>
          <Text style={styles.orderText}>
            Balance Payment: ${order.balance_payment}
          </Text>
          <Text style={styles.orderText}>
            Delivery Boy: {order?.delivery_boy?.name}
          </Text>
          <Text style={styles.orderText}>
            Delivery Date: {order?.delivery_date}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetailedComponent;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#011a26", // Dark Blue background color
    gap: 20,
  },
  orderContainer: {
    // gap: 40,
    // padding: 15,
    backgroundColor: "#043952", // Dark Blue background color
    marginBottom: 0,
    paddingBottom: 20,
    borderColor: "#cccccc",
  },
  orderText: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 5,
    // color: "#002f6c",
  },
});
