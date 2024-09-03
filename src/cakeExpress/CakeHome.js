import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import CakeOrdersList from "./CakeOrderList";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import OrderSummary from "./OrderSummery";
import { AuthenticationContext } from "../../context/auth/authentication.context";
import DataContext from "../../context/data/DataContext";
import { Ionicons } from "@expo/vector-icons";
import { DummyOrders } from "./cakesData";
import DateTimePicker from "@react-native-community/datetimepicker";

const CakeHome = () => {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthenticationContext);
  const { orders, fetchOrdersData } = useContext(DataContext);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [filteredOrders, setFilteredOrders] = useState(orders); // State for filtered orders
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [showSearch, setShowSearch] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const searchHandle = () => {
    setShowSearch(!showSearch);
  };

  // const handleDateChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShowDatePicker(Platform.OS === "ios");
  //   console.log(currentDate);
  //   setDate(currentDate);
  // };

  useEffect(() => {
    fetchOrdersData();
  }, []);

  useEffect(() => {
    filterOrders(searchQuery);
  }, [searchQuery]);

  const filterOrders = (query) => {
    const filtered = orders.filter((order) => {
      // Extracting only date part from the delivery_date
      const orderDate = order.delivery_date.split("T")[0];

      // Return all orders if query is null or empty
      if (!query) return true;

      return (
        order.sender_name?.toLowerCase().includes(query?.toLowerCase()) ||
        order.delivery_address?.toLowerCase().includes(query?.toLowerCase()) ||
        order.delivery_status?.toLowerCase().includes(query?.toLowerCase()) ||
        orderDate.includes(query) // Filter by delivery date
      );
    });
    setFilteredOrders(filtered);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");

    // Formatting selected date as "YYYY-MM-DD"
    const formattedDate = currentDate.toISOString().split("T")[0];

    // Updating searchQuery with the selected date
    setSearchQuery(formattedDate);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            backgroundColor: "#011a26",
            padding: 30,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 24,
                paddingTop: 20,
              }}
            >
              Cake Expess
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 14,
                  paddingTop: 20,
                }}
              >
                ({userInfo?.displayName})
              </Text>
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <TouchableOpacity onPress={searchHandle}>
              <Ionicons name="filter" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            padding: 5,
            backgroundColor: "#011a26",
            justifyContent: "center",
            alignContent: "center",
            paddingLeft: 10,
          }}
        >
          {showSearch && (
            <View>
              <TextInput
                style={styles.searchInput}
                placeholder="Search by pending or delivered"
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={styles.button}
                >
                  <Text style={{ color: "white", fontSize: 22 }}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={styles.button}
                >
                  <Text style={{ color: "white", fontSize: 22 }}>Tomorrow</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={styles.button}
                >
                  <Text style={{ color: "white", fontSize: 22 }}>
                    Search By Date
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
      </View>

      <OrderSummary orders={filteredOrders} />
      <CakeOrdersList orders={filteredOrders} />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("NewCakeOrder")}
      />
      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by pending or delivered"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />

          <FlatList
            data={filteredOrders}
            keyExtractor={(item) => item.order_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  // Handle filter selection
                  setModalVisible(false);
                }}
              >
                <Text>{item.customer_name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Text style={{ color: "white", padding: 20, fontSize: 22 }}>
              Close Modal
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  searchInput: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    padding: 3,
    borderRadius: 5,
  },
});

export default CakeHome;
