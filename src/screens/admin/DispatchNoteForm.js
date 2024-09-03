import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
// import DatePicker from 'react-native-datepicker'; // If you want to use a date picker
import moment from 'moment';

const DispatchNoteForm = ({ onSubmit }) => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverContact, setReceiverContact] = useState('');
  const [cakeName, setCakeName] = useState('');
  const [cakeType, setCakeType] = useState('');
  const [cakeWeight, setCakeWeight] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [advancedPayment, setAdvancedPayment] = useState('');
  const [balancePayment, setBalancePayment] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedBoy, setSelectedBoy] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [userId, setUserId] = useState('');

  const handleSubmit = () => {
    const formData = {
      deliveryAddress,
      senderName,
      senderContact,
      receiverName,
      receiverContact,
      cakeName,
      cakeType,
      cakeWeight,
      specialRequests,
      advancedPayment,
      balancePayment,
      date,
      selectedBoy,
      imageUrl,
      paymentStatus,
      userId,
    };
    onSubmit(formData); // Pass the form data to the parent component
  };

  return (
    <View>
      <Text>Delivery Address:</Text>
      <TextInput value={deliveryAddress} onChangeText={setDeliveryAddress} />

      <Text>Sender Name:</Text>
      <TextInput value={senderName} onChangeText={setSenderName} />

      <Text>Sender Contact:</Text>
      <TextInput value={senderContact} onChangeText={setSenderContact} />

      <Text>Receiver Name:</Text>
      <TextInput value={receiverName} onChangeText={setReceiverName} />

      <Text>Receiver Contact:</Text>
      <TextInput value={receiverContact} onChangeText={setReceiverContact} />

      <Text>Cake Name:</Text>
      <TextInput value={cakeName} onChangeText={setCakeName} />

      <Text>Cake Type:</Text>
      <TextInput value={cakeType} onChangeText={setCakeType} />

      <Text>Cake Weight:</Text>
      <TextInput value={cakeWeight} onChangeText={setCakeWeight} />

      <Text>Special Requests:</Text>
      <TextInput value={specialRequests} onChangeText={setSpecialRequests} />

      <Text>Advanced Payment:</Text>
      <TextInput value={advancedPayment} onChangeText={setAdvancedPayment} />

      <Text>Balance Payment:</Text>
      <TextInput value={balancePayment} onChangeText={setBalancePayment} />

      <Text>Delivery Date:</Text>

      <Text>Delivery Boy:</Text>
      <TextInput value={selectedBoy} onChangeText={setSelectedBoy} />

      <Text>Image URL:</Text>
      <TextInput value={imageUrl} onChangeText={setImageUrl} />

      <Text>Payment Status:</Text>
      <TextInput value={paymentStatus} onChangeText={setPaymentStatus} />

      <Text>User ID:</Text>
      <TextInput value={userId} onChangeText={setUserId} />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default DispatchNoteForm;
