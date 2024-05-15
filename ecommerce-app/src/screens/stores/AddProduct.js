import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { authApi, endpoints } from "../../apis/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const change = (field, value) => {
    setProduct((current) => {
      return { ...current, [field]: value };
    });
  };
  const picker = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission Denied!");
    } else {
      let res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled) {
        change("image", res.assets[0]);
      }
    }
  };
  const handlerAddProduct = async () => {
    const form = new FormData();
    for (let key in product)
      if (key === "image") {
        form.append(key, {
          uri: product[key].uri,
          name: product[key].fileName,
          type: product[key].type,
        });
      } else form.append(key, product[key]);
    try {
      let token = await AsyncStorage.getItem("access-token");
      let res = await authApi(token).post(endpoints["add-product"], form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Alert.alert("Add Successful");
    } catch (ex) {
      console.error(ex);
    }
  };
  return (
    <ScrollView>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <KeyboardAvoidingView>
          <View style={{ marginTop: 70 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="drive-file-rename-outline"
                size={24}
                color="black"
              />
              <TextInput
                value={product.name}
                onChangeText={(t) => change("name", t)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: product.name ? 16 : 16,
                }}
                placeholder="enter Product Name"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="drive-file-rename-outline"
                size={24}
                color="black"
              />
              <TextInput
                value={product.description}
                onChangeText={(t) => change("description", t)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: product.description ? 16 : 16,
                }}
                placeholder="enter Description"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="gray"
              />
              <TextInput
                value={product.price}
                onChangeText={(t) => change("price", t)}
                keyboardType="numeric"
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: product.price ? 16 : 16,
                }}
                placeholder="enter Price"
              />
            </View>
          </View>
          {product.image ? (
            <Image
              style={{
                width: 80,
                height: 80,
                marginHorizontal: "auto",
                marginTop: 10,
              }}
              source={{ uri: product.image.uri }}
            />
          ) : (
            ""
          )}
          <View style={{ marginTop: 80 }} />
          <Pressable
            onPress={picker}
            style={{
              width: 200,
              backgroundColor: "#FEBE10",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 15,
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Select Image...
            </Text>
          </Pressable>
          <Pressable
            onPress={handlerAddProduct}
            style={{
              width: 200,
              backgroundColor: "#FEBE10",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Add
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({});
