import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { FAB, Card, Paragraph, IconButton } from "react-native-paper";
import actions from "../../redux/actions";
import { deletePost } from "../../redux/actions/posts";
import DispatchNoteForm from "../agent/DispatchNoteForm";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import OrderSummary from "../../components/OrderSummery";

const CakeBookingList = ({ navigation }) => {
  const userData = useSelector((state) => state?.auth?.userData);
  console.log(userData);

  const userId = userData?._id;
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [formData, setFormData] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    userPosts();
  }, []);

  const userPosts = async () => {
    try {
      // Corrected IP address and included userId in the URL
      const response = await fetch(
        `http://192.168.29.247:3001/orders/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Include the Authorization header if a token is required
            Authorization: `Bearer ${userData?.token}`, // Assuming you have the token in userData
          },
        }
      );

      if (!response.ok) {
        // If response is not OK (e.g., 404, 500), handle the error
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Parse the response JSON
      console.log("res", data);
      setPosts(data); // Assuming setPosts is a useState hook
    } catch (error) {
      console.log("error raised", error);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      const response = await fetch(
        `http://192.168.29.247:3001/delete-order/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Booking deleted successfully");
        userPosts();
      } else {
        const result = await response.json();
        alert(result.message || "Failed to delete booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking");
    }
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setFormData(booking);
    setModalVisible(true);
  };

  const handleCreate = () => {
    setModalVisible1(true);
  };

  const handleFormSuccess = () => {
    setModalVisible1(false);
    userPosts(); // Reload the posts after form submission
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log("Updated Booking:", formData);
    setModalVisible(false);
  };

  console.log("posts", posts);

  return (
    <View style={styles.container}>
      <OrderSummary orders={posts} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={`${item.senderName} ➔ ${item.receiverName}`}
              right={() => (
                <View style={styles.iconContainer}>
                  <IconButton
                    icon="share"
                    size={20}
                    onPress={() =>
                      navigation.navigate("print", { cakeOrder: item })
                    }
                  />
                  <IconButton
                    icon="pencil"
                    size={20}
                    onPress={() => handleEdit(item)}
                  />
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => handleDelete(item._id)}
                  />
                </View>
              )}
            />
            <Card.Content>
              <Paragraph>Cake Name: {item.cakeName}</Paragraph>
              <Paragraph>Cake Type: {item.cakeType}</Paragraph>
              <Paragraph>Weight/Quantity: {item.weightOrQuantity}</Paragraph>
              <Paragraph>Special Wishes: {item.specialWishes}</Paragraph>
              <Paragraph>Date: {item.date}</Paragraph>
              <Paragraph>Time: {item.time}</Paragraph>
              <Paragraph>Sender Phone: {item.senderPhoneNumber}</Paragraph>
              <Paragraph>Receiver Phone: {item.receiverPhoneNumber}</Paragraph>
            </Card.Content>
          </Card>
        )}
        contentContainerStyle={styles.list}
      />

      <FAB style={styles.fab} small icon="plus" onPress={handleCreate} />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Header
            title="Edit Booking"
            showBackButton={true}
            onBackPress={() => setModalVisible(false)}
          />
          <View style={styles.modalContainer}>
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
              onChangeText={(value) => handleInputChange("receiverName", value)}
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
          </View>
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      <Modal
        visible={isModalVisible1}
        animationType="slide"
        onRequestClose={() => setModalVisible1(false)}
      >
        <View style={styles.modalContainer}>
          <Header
            title="Create Booking"
            showBackButton={true}
            onBackPress={() => setModalVisible1(false)}
          />
          <DispatchNoteForm onFormSuccess={handleFormSuccess} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  list: {
    paddingBottom: 80,
  },
  card: {
    marginBottom: 10,
    backgroundColor: "#ffffff",
  },
  iconContainer: {
    flexDirection: "row",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#6200ee",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CakeBookingList;
