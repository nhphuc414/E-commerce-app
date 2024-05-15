import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const MyProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Product Info", { item })}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: "https://res.cloudinary.com/dm5nn54wh/" + item.image }}
          style={styles.image}
        />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>đ{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MyProductItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
});
