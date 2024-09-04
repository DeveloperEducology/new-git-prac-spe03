import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  TextInput,
  SafeAreaView,
} from "react-native";
import Header from "../../components/Header";
import { Button } from "react-native-paper";
import { RadioButton, Divider } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

const CakeOrderDetails = ({ route, navigation }) => {
  const { cakeOrder } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState(cakeOrder);
  const [status, setStatus] = React.useState(formData?.status || "");
  const [boys, setBoys] = useState([]);
  const [deliveryBoy, setDeliveryBoy] = useState("");

  useEffect(() => {
    fetchBoys();
  }, []);

  const fetchBoys = async () => {
    try {
      const response = await fetch(`http://192.168.29.124:3001/deliveryboys`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched delivery boys:", data); // Check the structure of the response
      setBoys(data.data); // Ensure this is an array
    } catch (error) {
      console.log("error raised", error);
    }
  };

  console.log("boys", boys);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const updatedOrder = { ...formData, status, deliveryBoy };
    await updateOrder(updatedOrder);
    setModalVisible(false);
    navigation.goBack();
  };

  const updateOrder = async (updatedOrder) => {
    const orderId = cakeOrder?._id;
    try {
      const response = await fetch(
        `http://192.168.29.124:3001/orders/${orderId}`,
        {
          method: "PUT", // or "POST" if you are creating a new resource
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOrder),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the order");
      }

      const result = await response.json();
      console.log("Order updated successfully:", result);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Details"
        showBackButton={true}
        rightTitle="edit"
        onBackPress={() => navigation.goBack()}
        onRightPress={() => setModalVisible(true)}
        isShare={true}
        shareButton={() =>
          navigation.navigate("print", { cakeOrder: cakeOrder })
        }
      />
      <ScrollView>
        <Image
          source={{
            uri: cakeOrder.image
              ? cakeOrder.image
              : "https://ovenfresh.in/wp-content/uploads/2024/01/20240109_142246-1.jpg",
          }} // Replace with your image URL
          style={styles.cakeImage}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Order ID:</Text> {cakeOrder.orderId}
          </Text>
          <Divider />
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Sender Name:</Text>{" "}
            {cakeOrder.senderName}
          </Text>
          <Divider />
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Sender Phone:</Text>{" "}
            {cakeOrder.senderPhoneNumber}
          </Text>
          <Divider />
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Receiver Name:</Text>{" "}
            {cakeOrder.receiverName}
          </Text>
          <Divider />
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Receiver Phone:</Text>{" "}
            {cakeOrder.receiverPhoneNumber}
          </Text>
          <Divider />
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Shipping Address:</Text>{" "}
            {cakeOrder.shippingAddress}
          </Text>
          <Divider />
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Cake Name:</Text> {cakeOrder.cakeName}
          </Text>
          <Divider />
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Flavor:</Text> {cakeOrder.flavor}
          </Text>
          <Divider />
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Weight:</Text> {cakeOrder.weight}
          </Text>
          <Divider />
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Message on Card:</Text>{" "}
            {cakeOrder.messageOnCard}
          </Text>
          <Divider />
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Special Instructions:</Text>{" "}
            {cakeOrder.specialInstructions}
          </Text>
          <Divider />
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Quantity:</Text> {cakeOrder.quantity}
          </Text>
          <Divider />
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Price:</Text> ₹{cakeOrder.price}
          </Text>
          <Divider />
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Advance Payment:</Text> ₹
            {cakeOrder.advance_payment}
          </Text>
          <Divider />
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Balance Payment:</Text> ₹
            {cakeOrder.balance_payment}
          </Text>
          <Divider />
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Order Date:</Text> {cakeOrder.order_date}
          </Text>
          <Divider />
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Delivery Date:</Text>{" "}
            {cakeOrder.deliveryDate}
          </Text>
          <Divider />
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Delivery Status:</Text>{" "}
            {cakeOrder.status}
          </Text>
          <Divider />
          <Text style={styles.detailItem}>
            <Text style={styles.label}>Agent Name:</Text> {cakeOrder.agentName}
          </Text>
        </View>
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={styles.modalContainer}>
              <Header
                title="Edit Booking"
                showBackButton={true}
                onBackPress={() => setModalVisible(false)}
              />

              <TextInput
                style={styles.input}
                placeholder="Sender Name"
                value={formData.senderName}
                onChangeText={(value) => handleInputChange("senderName", value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Sender Phone Number"
                value={formData.senderPhoneNumber}
                onChangeText={(value) =>
                  handleInputChange("senderPhoneNumber", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Receiver Name"
                value={formData.receiverName}
                onChangeText={(value) =>
                  handleInputChange("receiverName", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Receiver Phone Number"
                value={formData.receiverPhoneNumber}
                onChangeText={(value) =>
                  handleInputChange("receiverPhoneNumber", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Cake Name"
                value={formData.cakeName}
                onChangeText={(value) => handleInputChange("cakeName", value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Cake Type"
                value={formData.cakeType}
                onChangeText={(value) => handleInputChange("cakeType", value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Weight/Quantity"
                value={formData.weightOrQuantity}
                onChangeText={(value) =>
                  handleInputChange("weightOrQuantity", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Special Wishes"
                value={formData.specialWishes}
                onChangeText={(value) =>
                  handleInputChange("specialWishes", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Date"
                value={formData.date}
                onChangeText={(value) => handleInputChange("date", value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Time"
                value={formData.time}
                onChangeText={(value) => handleInputChange("time", value)}
              />
              <Text>Delivery Status</Text>
              <RadioButton.Group
                onValueChange={(newValue) => setStatus(newValue)}
                value={status}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton value="pending" />
                    <Text>pending</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton value="processing" />
                    <Text>processing</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton value="delivered" />
                    <Text>delivered</Text>
                  </View>
                </View>
              </RadioButton.Group>
              <View>
                <Text style={styles.label}>Select a delivery boy:</Text>
                <Picker
                  deliveryBoy={deliveryBoy}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) =>
                    setDeliveryBoy(itemValue)
                  }
                >
                  {Array.isArray(boys) &&
                    boys.map((boy) => (
                      <Picker.Item
                        key={boy._id}
                        label={boy.name}
                        value={boy.name}
                      />
                    ))}
                </Picker>

                <Text style={styles.selectedText}>Selected: {deliveryBoy}</Text>
              </View>
            </ScrollView>

            <Button onPress={handleSave}>Save</Button>
            <Button onPress={() => setModalVisible(false)}>cancel</Button>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cakeImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 16,
    gap: 6,
  },
  detailItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CakeOrderDetails;
