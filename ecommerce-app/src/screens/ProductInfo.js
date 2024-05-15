import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { CartContext } from "../contexts/CartContext";

const ProductInfo = ({ route }) => {
  const { item } = route.params;
  const { addToCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://res.cloudinary.com/dm5nn54wh/" + item.image }}
        style={styles.image}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <View style={styles.storeContainer}>
        <Text style={styles.storeTitle}>Store Information:</Text>
        <Text style={styles.storeName}>Name: {item.store.name}</Text>
        <Text style={styles.storeAddress}>Address: {item.store.address}</Text>
      </View>
      <Button title="Add to Cart" onPress={() => addToCart(item)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: "#888",
    marginBottom: 20,
  },
  storeContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 20,
  },
  storeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  storeName: {
    fontSize: 16,
    marginBottom: 5,
  },
  storeAddress: {
    fontSize: 16,
    color: "#555",
  },
});

export default ProductInfo;
