import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Modal,
  TextInput,
  Text,
} from "react-native";
import { FAB, Card, Paragraph, IconButton, Button } from "react-native-paper";
import Header from "../../components/Header";
import { useSelector } from "react-redux";

const ListAgents = ({ navigation }) => {
  const userData = useSelector((state) => state?.auth?.userData);
  const [isModalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [boys, setBoys] = useState([]);

  const userId = userData?._id;

  useEffect(() => {
    userPosts();
  }, []);

  const userPosts = async () => {
    try {
      const response = await fetch(`http://192.168.29.124:3001/allboys`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBoys(data.data);
    } catch (error) {
      console.log("error raised", error);
    }
  };

  console.log("boys data in list agent", boys);

  const handleDelete = async (bookingId) => {
    try {
      const response = await fetch(
        `http://192.168.29.124:3001/delete-order/${bookingId}`,
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

  const handleCreate = () => {
    navigation.navigate("CreateAgent");
  };

  const handleFormSuccess = () => {
    setModalVisible1(false);
    userPosts();
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
      <>
        <FlatList
          data={boys}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Card
              style={styles.card}
              onPress={() =>
                navigation.navigate("details", { cakeOrder: item })
              }
            >
              <Card.Title
                title={`${item.name}`}
                right={() => (
                  <View style={styles.iconContainer}>
                    <IconButton
                      icon="delete"
                      size={20}
                      onPress={() => handleDelete(item._id)}
                    />
                  </View>
                )}
              />
              <Card.Content>
                <Paragraph>Name: {item.cakeName}</Paragraph>
                <Paragraph>Phone: {item.phoneNumber}</Paragraph>
                <Paragraph>Address: {item.address}</Paragraph>
              </Card.Content>
            </Card>
          )}
          contentContainerStyle={styles.list}
        />
      </>
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

          <Button onPress={handleSave}>Save</Button>
          <Button onPress={() => setModalVisible(false)}>cancel</Button>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    // padding: 10,
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
    padding: 6,
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

export default ListAgents;
