import React, { useState, useEffect} from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { FAB, Card, Paragraph, IconButton } from "react-native-paper";
import actions from '../../redux/actions'
import { deletePost } from "../../redux/actions/posts";

const sampleBookings = [
  {
    id: "1",
    senderName: "Alice",
    senderPhoneNumber: "1234567890",
    receiverName: "Bob",
    receiverPhoneNumber: "0987654321",
    cakeName: "Chocolate Cake",
    cakeType: "Buttercream",
    weightOrQuantity: "2 Kg",
    specialWishes: "Happy Birthday Bob!",
    date: "2024-09-01",
    time: "10:00 AM",
  },
  {
    id: "2",
    senderName: "Carol",
    senderPhoneNumber: "1234509876",
    receiverName: "Dave",
    receiverPhoneNumber: "6789012345",
    cakeName: "Vanilla Cake",
    cakeType: "Fondant",
    weightOrQuantity: "1.5 Kg",
    specialWishes: "Congratulations Dave!",
    date: "2024-09-05",
    time: "2:00 PM",
  },
  {
    id: "3",
    senderName: "Eve",
    senderPhoneNumber: "5678901234",
    receiverName: "Frank",
    receiverPhoneNumber: "4321098765",
    cakeName: "Red Velvet Cake",
    cakeType: "Cream Cheese",
    weightOrQuantity: "1 Kg",
    specialWishes: "Happy Anniversary!",
    date: "2024-09-10",
    time: "5:00 PM",
  },
];

const CakeBookingList = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [formData, setFormData] = useState({});
  const [posts, setPosts] = useState([])

  console.log("posts", posts)

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setFormData(booking);
    setModalVisible(true);
  };

  useEffect(() => {
    userPosts()
}, [])

const userPosts = async () => {
    try {
        const res = await actions.getAllPost()
        console.log("res++++", res)
        setPosts(res)
    } catch (error) {
        console.log("error raised", error)
    }
}


  // This is how you would call deletePost
  const handleDelete = async (bookingId) => {
    try {
      const response = await fetch(
        `http://192.168.29.247:3001/delete-order/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${user?.token}`, // Assuming you're using JWT
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Booking deleted successfully");
        userPosts();
      } else {
        alert(result.message || "Failed to delete booking");
        console.log(result.message)
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking");
    }
  };


  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log("Updated Booking:", formData);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
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

      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate("form")}
      />

      {/* Edit Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
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
            onChangeText={(value) => handleInputChange("specialWishes", value)}
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
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
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
