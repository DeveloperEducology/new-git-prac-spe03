import React from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import moment from "moment"; // Import moment for date formatting
import { useSelector } from "react-redux";

export default function DispatchNoteForm({ navigation, onFormSuccess }) {
  const { control, handleSubmit, watch, setValue } = useForm();
  const userData = useSelector((state) => state?.auth?.userData);
  const [date, setDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const userId = userData?._id;

  // Watch advanced and balance payments to calculate total payment dynamically
  const advancedPayment = watch("advancedPayment", "0");
  const balancePayment = watch("balancePayment", "0");

  React.useEffect(() => {
    // Update totalPayment whenever advancedPayment or balancePayment changes
    const totalPayment =
      parseFloat(advancedPayment) + parseFloat(balancePayment);
    setValue("totalPayment", totalPayment.toString());
  }, [advancedPayment, balancePayment]);

  const onSubmit = (data) => {
    const orderId = Date.now().toString();

    const formData = {
      ...data,
      orderId,
      userId,
      delivery_date: moment(date).format("YYYY-MM-DD"),
    };

    console.log(formData);
    onFormSuccess();

    // Make API call to backend with formData
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dispatch Note Form</Text>

      {/* Order ID */}
      <Text style={styles.label}>Order ID:</Text>
      <Controller
        control={control}
        name="orderId"
        defaultValue={Date.now().toString()} // Generate a new orderId
        render={({ field: { value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            editable={false} // Disabled as it's static
          />
        )}
      />

      {/* Order Date */}
      <Text style={styles.label}>Order Date:</Text>
      <Controller
        control={control}
        name="orderDate"
        defaultValue={moment().format("YYYY-MM-DD HH:mm:ss")}
        render={({ field: { value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            editable={false} // Disabled as it's static
          />
        )}
      />

      {/* Sender Name */}
      <Text style={styles.label}>Sender Name:</Text>
      <Controller
        control={control}
        name="senderName"
        defaultValue={userData?.name || "Sender Name"} // Assuming sender's name is in userData
        render={({ field: { value, onChange } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Receiver Name */}
      <Text style={styles.label}>Receiver Name:</Text>
      <Controller
        control={control}
        name="receiverName"
        defaultValue=""
        render={({ field: { value, onChange } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Contact Number */}
      <Text style={styles.label}>Contact Number:</Text>
      <Controller
        control={control}
        name="contactNumber"
        defaultValue=""
        render={({ field: { value, onChange } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
          />
        )}
      />

      {/* Shipping Address */}
      <Text style={styles.label}>Shipping Address:</Text>
      <Controller
        control={control}
        name="shippingAddress"
        defaultValue=""
        render={({ field: { value, onChange } }) => (
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
        name="productName"
        defaultValue=""
        render={({ field: { value, onChange } }) => (
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
        defaultValue=""
        render={({ field: { value, onChange } }) => (
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
        defaultValue=""
        render={({ field: { value, onChange } }) => (
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
        defaultValue=""
        render={({ field: { value, onChange } }) => (
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
        render={({ field: { value, onChange } }) => (
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
        defaultValue=""
        render={({ field: { value, onChange } }) => (
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
        name="shippingDate"
        defaultValue={date.toDateString()}
        render={({ field: { value, onChange } }) => (
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
        defaultValue=""
        render={({ field: { value, onChange } }) => (
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
        render={({ field: { value, onChange } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
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
        name="advancedPayment"
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
        name="balancePayment"
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

      {/* Submit Button */}
      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
});
