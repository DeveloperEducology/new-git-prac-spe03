import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const AdminHomeScreen = () => {
  // Sample data for orders placed today by different agents
  const [date, setDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const ordersData = [
    {
      id: '1',
      agentName: 'Agent 1',
      ordersPlaced: 5,
      totalSales: 150,
      pendingOrders: 2,
      balanceAmount: 50,
      advanceAmount: 100,
    },
    {
      id: '2',
      agentName: 'Agent 2',
      ordersPlaced: 8,
      totalSales: 240,
      pendingOrders: 1,
      balanceAmount: 90,
      advanceAmount: 150,
    },
    {
      id: '3',
      agentName: 'Agent 3',
      ordersPlaced: 3,
      totalSales: 90,
      pendingOrders: 0,
      balanceAmount: 30,
      advanceAmount: 60,
    },
  ];

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.agentName}>{item.agentName}</Text>
      <Text style={styles.orderDetails}>
        Orders Placed: {item.ordersPlaced}
      </Text>
      <Text style={styles.orderDetails}>Pending Orders: {item.pendingOrders}</Text>
      <Text style={styles.orderDetails}>Total Sales: ${item.totalSales}</Text>
      <Text style={styles.orderDetails}>Balance Amount: ${item.balanceAmount}</Text>
      <Text style={styles.orderDetails}>Advance Amount: ${item.advanceAmount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>
      <Text style={styles.subHeader}>Orders Placed Today</Text>
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

      <FlatList
        data={ordersData}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default AdminHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  listContainer: {
    paddingBottom: 20,
  },
  orderItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#007AFF',
  },
  orderDetails: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
});
