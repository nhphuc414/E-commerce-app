import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, Button, Alert } from "react-native";
import { CartContext } from "../contexts/CartContext";
import { useNavigation } from "@react-navigation/native";
import { authApi, endpoints } from "../apis/Api";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Order = () => {
  const { cart, getTotal, clearCart } = useContext(CartContext);
  const navigation = useNavigation();
  const handleConfirmOrder = async () => {
    try {
      let token = await AsyncStorage.getItem("access-token");
      console.log(cart);
      let res = await authApi(token).post(endpoints["place-order"], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_details: cart.map((item) => ({
            product_id: item.id,
            price: item.price,
            quantity: item.quantity,
          })),
          total: getTotal(),
        }),
      });
      console.log(res.data);
      if (res.status !== 201) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
      clearCart();
      Alert.alert(
        "Order Confirmed",
        "Your order has been placed successfully!"
      );
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Order Failed",
        "There was an issue placing your order. Please try again."
      );
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
      <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <Text style={styles.totalText}>Total: ${getTotal()}</Text>
            <Button title="Confirm Order" onPress={handleConfirmOrder} />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 16,
    color: "#888",
  },
  itemQuantity: {
    fontSize: 16,
    color: "#888",
  },
  footerContainer: {
    padding: 20,
    alignItems: "center",
  },
  totalText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Order;
