import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { authApi, endpoints } from "../../apis/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import MyButton from "../../components/MyButton";
import { useNavigation } from "@react-navigation/native";

const Stores = () => {
  const [stores, setStores] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    const loadRequestStores = async () => {
      try {
        let token = await AsyncStorage.getItem("access-token");
        let res = await authApi(token).get(endpoints["list-request-store"]);
        setStores(res.data);
      } catch (error) {
        console.log("error message", error);
      }
    };
    loadRequestStores();
  }, []);
  const handleAccept = async (storeId) => {
    try {
      let token = await AsyncStorage.getItem("access-token");
      let res = await authApi(token).post(endpoints["accept-store"](storeId));
      Alert.alert("Accept Successful");
    } catch (ex) {
      console.error(ex);
    }
  };
  const handleDenied = async (storeId) => {
    try {
      let token = await AsyncStorage.getItem("access-token");
      let res = await authApi(token).post(endpoints["denied-store"](storeId));
      Alert.alert("Denied Successful");
    } catch (ex) {
      console.error(ex);
    }
  };
  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 10 }}>
      <Text
        style={{
          textAlign: "center",
          color: "black",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Name: {item.name}
      </Text>
      <Text
        style={{
          textAlign: "center",
          color: "black",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Name: {item.address}
      </Text>
      <Pressable
        onPress={() => handleAccept(item.id)}
        style={{
          width: 200,
          backgroundColor: "#FEBE10",
          borderRadius: 6,
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 10,
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
          Accept
        </Text>
      </Pressable>
      <Pressable
        onPress={() => handleDenied(item.id)}
        style={{
          width: 200,
          backgroundColor: "#FEBE10",
          borderRadius: 6,
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 10,
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
          Denied
        </Text>
      </Pressable>
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: "black",
      }}
    >
      {stores == [] || stores == null ? (
        <Text>No Request</Text>
      ) : (
        <FlatList
          data={stores}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default Stores;

const styles = StyleSheet.create({});
