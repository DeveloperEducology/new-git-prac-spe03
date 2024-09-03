import React from 'react';
import { View, Button } from 'react-native';
import DispatchNoteForm from './DispatchNoteForm';
import moment from 'moment';

const DispatchForm = () => {
  const handleFormSubmit = (formData) => {
    const data = {
      order_id: Date.now().toString(), // Generating a unique order ID
      delivery_address: formData.deliveryAddress,
      sender_name: formData.senderName,
      sender_contact: formData.senderContact,
      receiver_name: formData.receiverName,
      receiver_contact: formData.receiverContact,
      cake_name: formData.cakeName,
      cake_type: formData.cakeType,
      cake_weight: formData.cakeWeight,
      special_requests: formData.specialRequests,
      advanced_payment: formData.advancedPayment,
      balance_payment: formData.balancePayment,
      delivery_date: moment(formData.date).format("YYYY-MM-DD"),
      delivery_boy: formData.selectedBoy,
      userId: formData.userId,
      imageURL: formData.imageUrl,
      delivery_status: "pending",
      payment_status: formData.paymentStatus, // Use paymentStatus directly
    };

    // You can now send this data to your server or use it as needed
    console.log('Final Dispatch Data:', data);
  };

  return (
    <View>
      <DispatchNoteForm onSubmit={handleFormSubmit} />
    </View>
  );
};

export default DispatchForm;
