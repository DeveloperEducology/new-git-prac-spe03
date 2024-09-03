import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import OrderDetailedComponent from "./OrderDetailedComponent";

const OrderDetails = ({ route }) => {
  const order = route.params.item;
  //console.log(order);

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <OrderDetailedComponent order={order} />
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
