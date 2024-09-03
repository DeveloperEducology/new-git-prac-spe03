import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const CakeOrdersList = ({ orders, onPress, item }) => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orderContainer}
      onPress={() => navigation.push("OrderDetails", { item })}
    >
      <View style={{ borderRadius: 99 }}>
        <Image
          source={{ uri: item?.imageURL }}
          style={{ width: 100, height: 100, borderRadius: 99 }}
        />
      </View>
      <View style={{ width: "80%" }}>
        <Text style={styles.orderText}>Order ID: {item.order_id}</Text>
        <Text style={styles.orderText}>
          Delivery Time: {item?.delivery_date}
        </Text>
        <Text style={styles.orderText}>Delivery Date: 6pm</Text>
        <Text style={styles.orderText}>
          Delivery Address: {item.delivery_address}
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={styles.amount}>Advance: {item?.advanced_payment}</Text>
          <Text style={styles.amount}>Balance: {item?.balance_payment}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={orders}
      renderItem={renderItem}
      keyExtractor={(item) => item.order_id}
      style={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "#011a26", // Dark Blue background color
  },
  orderContainer: {
    padding: 15,
    backgroundColor: "#043952", // Dark Blue background color
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#cccccc",
    flexDirection: "row",
    gap: 10,
  },
  orderText: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 5,
    // color: "#002f6c",
  },
  amount: {
    fontWeight: "bold",
    fontSize: 12,
    color: "gray",
  },
});

export default CakeOrdersList;
