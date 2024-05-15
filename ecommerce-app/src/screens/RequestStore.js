import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MyButton from "../components/MyButton";
import { authApi, endpoints } from "../apis/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
const RequestStore = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigation = useNavigation();
  const handleRequest = async () => {
    try {
      let token = await AsyncStorage.getItem("access-token");
      let res = await authApi(token).post(
        endpoints["request-store"],
        {
          name: name,
          address: address,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Alert.alert("Requesting success");
      navigation.goBack();
    } catch (ex) {
      Alert.alert("Requesting Error", "An error occurred while Requesting");
      console.log("Requesting failed", ex);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 12,
              color: "#041E42",
            }}
          >
            Request Store
          </Text>
        </View>

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
            <Ionicons
              style={{ marginLeft: 8 }}
              name="storefront"
              size={24}
              color="black"
            />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: name ? 16 : 16,
              }}
              placeholder="enter your Store name"
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
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
            <Entypo
              style={{ marginLeft: 8 }}
              name="address"
              size={24}
              color="black"
            />
            <TextInput
              value={address}
              onChangeText={(text) => setAddress(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: address ? 16 : 16,
              }}
              placeholder="enter your Store Address"
            />
          </View>
        </View>
        <View style={{ marginTop: 80 }} />
        <MyButton callback={handleRequest} text={"Request"}></MyButton>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RequestStore;

const styles = StyleSheet.create({});
