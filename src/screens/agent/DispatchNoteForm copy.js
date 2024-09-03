import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import moment from "moment";
import { launchImageLibrary } from "react-native-image-picker";

export default function DispatchNoteForm({ navigation, onFormSuccess }) {
  const userData = useSelector((state) => state?.auth?.userData);
  const { control, handleSubmit } = useForm();
  const [date, setDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const userId = userData?._id;
  const agentName = userData?.name;
  const [image, setImage] = React.useState(null);

  const handleImagePicker = () => {
    const options = {
      mediaType: "photo",
      includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const selectedImage = response.assets[0];
        setImage(selectedImage);
      }
    });
  };

  console.log(date);

  const onSubmit = async (data) => {
    const currentDate = new Date();
    const order_date = moment(currentDate).format("DD-MM-YYYY");
    const deliveryDate = moment(date).format("DD-MM-YYYY");
    const orderId = Date.now().toString(); // Generating a unique order ID
    const formData = {
      ...data,
      orderId,
      userId,
      order_date,
      deliveryDate,
      agentName,
    };
    console.log("Submitting form data:", formData);

    const handleCreate = async () => {
      try {
        const response = await fetch(
          `http://192.168.29.124:3001/create-order`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userData?.token}`, // Assuming you're using JWT
            },
            body: JSON.stringify(formData),
          }
        );

        const result = await response.json();

        if (response.ok) {
          alert("Order created successfully");
          console.log("Success:", result);
          onFormSuccess();
        } else {
          alert(result.message || "Failed to create order");
          console.log("Error response:", result);
        }
      } catch (error) {
        console.error("Error creating order:", error);
        alert("Failed to create order due to an error. Please try again.");
      }
    };

    // Call handleCreate function here
    await handleCreate();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Dispatch Note Form</Text>

        {/* Sender Name */}
        <Text style={styles.label}>Sender Name:</Text>
        <Controller
          control={control}
          name="senderName"
          defaultValue="Sheetal"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              editable={false} // Disabled as it's static
            />
          )}
        />

        {/* Sender Number */}
        <Text style={styles.label}>Sender Number:</Text>
        <Controller
          control={control}
          name="senderPhoneNumber"
          defaultValue="9347838726"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
            />
          )}
        />

        {/* Receiver Name */}
        <Text style={styles.label}>Receiver Name:</Text>
        <Controller
          control={control}
          name="receiverName"
          defaultValue="Sheetal"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {/* Receiver Number */}
        <Text style={styles.label}>Receiver Number:</Text>
        <Controller
          control={control}
          name="receiverPhoneNumber"
          defaultValue="9347838726"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
            />
          )}
        />

        {/* Price */}
        <Text style={styles.label}>Price:</Text>
        <Controller
          control={control}
          name="price"
          defaultValue="1200"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
            />
          )}
        />

        {/* Shipping Address */}
        <Text style={styles.label}>Shipping Address:</Text>
        <Controller
          control={control}
          name="shippingAddress"
          defaultValue="D 1002 Aparna towers kondapur floor 10th, Hyderabad, 500084"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              multiline
            />
          )}
        />

        {/* Product Name */}
        <Text style={styles.label}>Product Name:</Text>
        <Controller
          control={control}
          name="cakeName"
          defaultValue="Football Player Cake"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {/* Weight */}
        <Text style={styles.label}>Weight:</Text>
        <Controller
          control={control}
          name="weight"
          defaultValue="1 Kg"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {/* Flavor */}
        <Text style={styles.label}>Flavor:</Text>
        <Controller
          control={control}
          name="flavor"
          defaultValue="Light Chocolate"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {/* Message on Card */}
        <Text style={styles.label}>Message on Card:</Text>
        <Controller
          control={control}
          name="messageOnCard"
          defaultValue="HappyBirthdayRudhwikram"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              multiline
            />
          )}
        />

        {/* Special Instructions */}
        <Text style={styles.label}>Special Instructions:</Text>
        <Controller
          control={control}
          name="specialInstructions"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              multiline
            />
          )}
        />

        {/* Shipping Info */}
        <Text style={styles.label}>Shipping Info:</Text>
        <Controller
          control={control}
          name="shippingInfo"
          defaultValue="City - Hyderabad, Pincode - 500084"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              multiline
            />
          )}
        />

        {/* Shipping Date */}
        <Text style={styles.label}>Shipping Date:</Text>
        <Controller
          control={control}
          name="deliveryDate"
          defaultValue={date.toISOString()}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Button onPress={() => setShowDatePicker(true)}>
          {date.toDateString()}
        </Button>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}

        {/* Shipping Time */}
        <Text style={styles.label}>Shipping Time:</Text>
        <Controller
          control={control}
          name="shippingTime"
          defaultValue="09:00 - 21:00"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {/* Quantity */}
        <Text style={styles.label}>Quantity:</Text>
        <Controller
          control={control}
          name="quantity"
          defaultValue="1"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {/* Total Payment */}
        <Text style={styles.label}>Total Payment:</Text>
        <Controller
          control={control}
          name="totalPayment"
          defaultValue="0"
          render={({ field: { value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              editable={false} // Calculated field
            />
          )}
        />

        {/* Advanced Payment */}
        <Text style={styles.label}>Advanced Payment:</Text>
        <Controller
          control={control}
          name="advance_payment"
          defaultValue="0"
          render={({ field: { value, onChange } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
            />
          )}
        />

        {/* Balance Payment */}
        <Text style={styles.label}>Balance Payment:</Text>
        <Controller
          control={control}
          name="balance_payment"
          defaultValue="0"
          render={({ field: { value, onChange } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
            />
          )}
        />
      </ScrollView>
      <Button onPress={handleSubmit(onSubmit)} mode="contained">
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
});
