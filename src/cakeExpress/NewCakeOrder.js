import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  ToastAndroid,
  Text,
  Platform,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage"; // Import storage module
import { AuthenticationContext } from "../../context/auth/authentication.context";
import DateTimePicker from "@react-native-community/datetimepicker";
import DataContext from "../../context/data/DataContext";
import { useNavigation } from "@react-navigation/native";
import { Chip, List, RadioButton } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";

const NewCakeOrder = () => {
  const { userInfo } = useContext(AuthenticationContext);
  const { orders, fetchOrdersData, deliveryBoys, fetchBoysData } =
    useContext(DataContext);
  const navigation = useNavigation();
  const userId = userInfo.uid;
  const todoRef = firebase.firestore().collection("cakeOrders");
  const sheet5Ref = useRef(null);
  const [deliveryAddress, setDeliveryAddress] = useState("ECIL, NN Colony");
  const [cakeName, setCakeName] = useState("Chocolate Cake");
  const [cakeType, setCakeType] = useState("Eggless");
  const [cakeSize, setCakeSize] = useState("small");
  const [cakeWeight, setCakeWeight] = useState("1/2kg");
  const [specialRequests, setSpecialRequests] = useState(
    "Mention Happy Birth Day"
  );
  const [advancedPayment, setAdvancedPayment] = useState(0);
  const [balancePayment, setBalancePayment] = useState(0);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedBoy, setSelectedBoy] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null); // State to store image URL
  const [senderName, setSenderName] = useState(null);
  const [senderContact, setSenderContact] = useState(null);
  const [recieverName, setRecieverName] = useState(null);
  const [recieverContact, setRecieverContact] = useState(null);

  useEffect(() => {
    fetchBoysData();
  }, []);

  const addCakeOrder = async () => {
    // Check if image exists before uploading
    if (!cakeName || !senderName || !recieverName) {
      return false;
    }
    const data = {
      order_id: Date.now().toString(), // Generating a unique order ID
      delivery_address: deliveryAddress,
      sender_name: senderName,
      sender_contact: senderContact,
      reciever_name: recieverName,
      reciever_contact: recieverContact,
      cake_name: cakeName,
      cake_type: cakeType,
      cake_weight: cakeWeight,
      special_requests: specialRequests,
      advanced_payment: advancedPayment,
      balance_payment: balancePayment,
      delivery_date: moment(date).format("YYYY-MM-DD"),
      delivery_boy: selectedBoy,
      userId: userId,
      imageURL: imageUrl, // Use imageURL directly
      delivery_status: "pending",
      payment_status: false, // Use paymentStatus directly
    };

    todoRef
      .add(data)
      .then(() => {
        showToastWithGravity("Successfully created");
        fetchOrdersData(); // Fetch updated orders data
        // navigation.push("CakeHome");
      })
      .catch((error) => {
        console.error("Error adding cake order: ", error);
        showToastWithGravity("Failed to create cake order");
      });
  };

  const showToastWithGravity = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShowTimePicker(Platform.OS === "ios");
    setDate(currentTime);
  };

  const [paymentmode, setPaymentmode] = useState(null);

  function handlePaymentMode(gender) {
    setPaymentmode(gender);
  }

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 7],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result);
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    try {
      setUploading(true);
      const response = await fetch(image);
      const blob = await response.blob();
      const uploadTask = firebase
        .storage()
        .ref()
        .child(`images/${userId}/${Date.now()}`)
        .put(blob);
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Error uploading image: ", error);
          setUploading(false);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("Image uploaded successfully: ", downloadURL);
            setImageUrl(downloadURL);
            setUploading(false);
            setImage(downloadURL);
          });
        }
      );
    } catch (error) {
      console.error("Error uploading image: ", error);
      setUploading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <List.AccordionGroup>
          <List.Accordion title="Sender Details" id="1">
            <TextInput
              style={styles.input}
              placeholder="Sender Name"
              value={senderName}
              onChangeText={setSenderName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={senderContact}
              onChangeText={setSenderContact}
              keyboardType="numeric"
            />
          </List.Accordion>
          <List.Accordion title="Receiver Details" id="2">
            <TextInput
              style={styles.input}
              placeholder="Receiver Name"
              value={recieverName}
              onChangeText={setRecieverName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={recieverContact}
              onChangeText={setRecieverContact}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Delivery Address"
              value={deliveryAddress}
              onChangeText={setDeliveryAddress}
            />
          </List.Accordion>
          <List.Accordion title="Cake Details" id="3">
            <TextInput
              style={styles.input}
              placeholder="Cake Name"
              value={cakeName}
              onChangeText={setCakeName}
            />
            <TextInput
              style={styles.input}
              placeholder="Cake Type"
              value={cakeType}
              onChangeText={setCakeType}
            />
            <TextInput
              style={styles.input}
              placeholder="Cake weight"
              value={cakeWeight}
              onChangeText={setCakeWeight}
            />
            <TextInput
              style={styles.input}
              placeholder="Greeting Message"
              value={specialRequests}
              onChangeText={setSpecialRequests}
            />
          </List.Accordion>
          <List.Accordion title="Date & Time" id="4">
            <View style={{ flex: 1, gap: 15 }}>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Select Date</Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={handleDateChange}
                />
              )}
              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Select Time</Text>
              </TouchableOpacity>

              {showTimePicker && (
                <DateTimePicker
                  value={date}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={handleTimeChange}
                />
              )}
            </View>
          </List.Accordion>
          <List.Accordion title="Payment Details" id="5">
            <TextInput
              style={styles.input}
              placeholder="Advanced Payment"
              value={advancedPayment}
              onChangeText={(text) => setAdvancedPayment(parseFloat(text))}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Balance Payment"
              value={balancePayment}
              onChangeText={(text) => setBalancePayment(parseFloat(text))}
              keyboardType="numeric"
            />
            <View style={styles.radioGroup}>
              <Text style={styles.label}>Select Student Gender</Text>
              <RadioButton.Group
                onValueChange={handlePaymentMode}
                value={paymentmode}
              >
                <View style={styles.radioButtonContainer}>
                  <RadioButton.Item label="Online" value="online" />
                  <RadioButton.Item label="Offline" value="offline" />
                </View>
              </RadioButton.Group>
            </View>
          </List.Accordion>
          <List.Accordion title="Image and Delivey boy" id="6">
            <View>
              <TouchableOpacity
                onPress={() => sheet5Ref.current.open()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  {selectedBoy?.name || "select Boy "}{" "}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              <View>
                {imageUrl && (
                  <Image
                    source={{ uri: imageUrl }}
                    style={{ width: 170, height: 200 }}
                  />
                )}
                {imageUrl ? null : (
                  <TouchableOpacity onPress={pickImage} style={styles.button}>
                    <Text style={styles.buttonText}>Select Image </Text>
                  </TouchableOpacity>
                )}
              </View>

              {!uploading ? (
                image && (
                  <TouchableOpacity onPress={uploadImage} style={styles.button}>
                    <Text style={styles.buttonText}>Upload Image </Text>
                  </TouchableOpacity>
                )
              ) : (
                <ActivityIndicator size={"small"} color="black" />
              )}
            </View>
          </List.Accordion>
        </List.AccordionGroup>

        <>
          <RBSheet
            ref={sheet5Ref}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={500}
            customStyles={{
              wrapper: {
                backgroundColor: "transparent",
              },
              draggableIcon: {
                backgroundColor: "#000",
              },
            }}
          >
            <View style={styles.card}>
              {deliveryBoys?.map((item) => {
                return (
                  item && (
                    <Chip
                      key={item.id}
                      selected={selectedBoy?.id === item.id}
                      selectedColor={
                        selectedBoy?.id === item.id ? "green" : "red"
                      }
                      showSelectedCheck
                      onPress={() => setSelectedBoy(item)}
                    >
                      {item.name}
                    </Chip>
                  )
                );
              })}
            </View>
          </RBSheet>
        </>
      </View>
      <View>
        <TouchableOpacity onPress={addCakeOrder} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewCakeOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#011a26",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  radioGroup: {
    borderWidth: 1,
    justifyContent: "space-between",
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
