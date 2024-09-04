import React from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";

const CreateAgent = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const userData = useSelector((state) => state?.auth?.userData);
  const onSubmit = async (data) => {
    // Add userId to the form data
    const formData = { ...data, adminId: userData?._id };

    console.log("Sending Data:", formData);
    try {
      const response = await fetch("http://192.168.29.124:3001/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response Status:", response.status);
      const result = await response.json();
      console.log("Response Data:", result);

      if (response.ok) {
        Alert.alert("Success", "Agent created successfully!");
        reset(); // Reset the form fields after successful submission
      } else {
        Alert.alert("Error", result.message || "Failed to create agent");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="agentName"
        rules={{ required: "Agent name is required" }}
        defaultValue="Sheetal"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Agent Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.agentName && (
        <Text style={styles.error}>{errors.agentName.message}</Text>
      )}

      <Controller
        control={control}
        name="age"
        rules={{ required: "Age is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Age"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.age && <Text style={styles.error}>{errors.age.message}</Text>}

      <Controller
        control={control}
        name="phoneNumber"
        rules={{ required: "Phone number is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.phoneNumber && (
        <Text style={styles.error}>{errors.phoneNumber.message}</Text>
      )}

      <Controller
        control={control}
        name="email"
        rules={{ required: "Email is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        rules={{ required: "Password is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <Controller
        control={control}
        name="address"
        rules={{ required: "Address is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.address && (
        <Text style={styles.error}>{errors.address.message}</Text>
      )}

      <Controller
        control={control}
        name="userType"
        rules={{ required: "Type is required" }}
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            style={styles.input}
            onValueChange={onChange}
          >
            <Picker.Item label="Select Type" value="" />
            <Picker.Item label="Delivery Boy" value="deliveryBoy" />
            <Picker.Item label="Agent" value="agent" />
          </Picker>
        )}
      />
      {errors.type && <Text style={styles.error}>{errors.type.message}</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default CreateAgent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
