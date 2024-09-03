import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Modal, TextInput } from "react-native";
import { FAB, Card, Paragraph, IconButton, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import OrderSummary from "../../components/OrderSummery";
import moment from "moment";
import DispatchNoteForm from "../agent/DispatchNoteForm";

const CakeBookingList = ({ navigation }) => {
  const userData = useSelector((state) => state?.auth?.userData);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [formData, setFormData] = useState({});
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const userId = userData?._id;

  useEffect(() => {
    userPosts();
  }, []);

  useEffect(() => {
    filterPostsByDateRange();
  }, [startDate, endDate, posts]);

  const userPosts = async () => {
    try {
      const response = await fetch(
        `http://192.168.29.124:3001/orders/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Parse and format dates here if needed

      setPosts(data);
    } catch (error) {
      console.log("error raised", error);
    }
  };

  const filterPostsByDateRange = () => {
    const filtered = posts.filter((post) => {
      const postDate = moment(post.order_date, "DD-MM-YYYY");
      const startMoment = moment(startDate, "DD-MM-YYYY");
      const endMoment = moment(endDate, "DD-MM-YYYY");

      console.log("Post Date:", postDate.format("DD-MM-YYYY"));
      console.log("Start Date:", startMoment.format("DD-MM-YYYY"));
      console.log("End Date:", endMoment.format("DD-MM-YYYY"));

      return (
        postDate.isSameOrAfter(startMoment) &&
        postDate.isSameOrBefore(endMoment)
      );
    });
    setFilteredPosts(filtered);
  };

  console.log("filteredPosts", filteredPosts);

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
      <View style={styles.dateRangeContainer}>
        <Button onPress={() => setShowStartDatePicker(true)}>
          From: {moment(startDate).format("DD-MM-YYYY")}
        </Button>
        <Button onPress={() => setShowEndDatePicker(true)}>
          To: {moment(endDate).format("DD-MM-YYYY")}
        </Button>
      </View>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartDatePicker(false);
            if (selectedDate) {
              setStartDate(selectedDate);
            }
          }}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndDatePicker(false);
            if (selectedDate) {
              setEndDate(selectedDate);
            }
          }}
        />
      )}

      <OrderSummary orders={filteredPosts} />
      <FlatList
        data={filteredPosts}
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

          <Button onPress={handleSave}>Save Changes</Button>
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
          <DispatchNoteForm
            formData={formData}
            onFormSuccess={handleFormSuccess}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: "row",
  },
  list: {
    paddingBottom: 80,
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
  dateRangeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});

export default CakeBookingList;
