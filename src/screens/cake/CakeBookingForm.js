import React from "react";
import { View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, RadioButton, Divider } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";

const CakeBookingForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [date, setDate] = React.useState(new Date());
  const userData = useSelector((state) => state?.auth?.userData);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [status, setStatus] = React.useState();

  const onSubmit = (data) => {
    const orderId = Date.now().toString();
    // const totalPayment = parseFloat(data.advancedPayment) + parseFloat(data.balancePayment);

    const formData = {
      ...data,
      orderId,
      userId,
      // totalPayment,
      delivery_date: moment(date).format("YYYY-MM-DD"),
    };

    console.log(formData);
    // Make API call to backend with formData
  };
  return (
    <View style={{ padding: 20 }}>
      <Controller
        control={control}
        rules={{ required: "Sender name is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Sender Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.senderName}
          />
        )}
        name="senderName"
      />
      {errors.senderName && (
        <Text style={{ color: "red" }}>{errors.senderName.message}</Text>
      )}

      <Controller
        control={control}
        rules={{ required: "Sender phone number is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Sender Phone Number"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="phone-pad"
            error={errors.senderPhoneNumber}
          />
        )}
        name="senderPhoneNumber"
      />
      {errors.senderPhoneNumber && (
        <Text style={{ color: "red" }}>{errors.senderPhoneNumber.message}</Text>
      )}

      <Controller
        control={control}
        rules={{ required: "Receiver name is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Receiver Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.receiverName}
          />
        )}
        name="receiverName"
      />
      {errors.receiverName && (
        <Text style={{ color: "red" }}>{errors.receiverName.message}</Text>
      )}

      <Controller
        control={control}
        rules={{ required: "Receiver phone number is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Receiver Phone Number"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="phone-pad"
            error={errors.receiverPhoneNumber}
          />
        )}
        name="receiverPhoneNumber"
      />
      {errors.receiverPhoneNumber && (
        <Text style={{ color: "red" }}>
          {errors.receiverPhoneNumber.message}
        </Text>
      )}

      <Controller
        control={control}
        rules={{ required: "Cake name is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Cake Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.cakeName}
          />
        )}
        name="cakeName"
      />
      {errors.cakeName && (
        <Text style={{ color: "red" }}>{errors.cakeName.message}</Text>
      )}

      <Controller
        control={control}
        rules={{ required: "Cake type is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Cake Type"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.cakeType}
          />
        )}
        name="cakeType"
      />
      {errors.cakeType && (
        <Text style={{ color: "red" }}>{errors.cakeType.message}</Text>
      )}

      <Controller
        control={control}
        rules={{ required: "Weight or quantity is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Weight/Quantity"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.weightOrQuantity}
          />
        )}
        name="weightOrQuantity"
      />
      {errors.weightOrQuantity && (
        <Text style={{ color: "red" }}>{errors.weightOrQuantity.message}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Special Wishes"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.specialWishes}
          />
        )}
        name="specialWishes"
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

      <Divider style={{ marginVertical: 10 }} />

      <Text>Payment Method</Text>
      <RadioButton.Group
        onValueChange={(newValue) => setStatus(newValue)}
        value={formData.status || status}
      >
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
      </RadioButton.Group>

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </View>
  );
};

export default CakeBookingForm;
