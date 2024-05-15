import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyButton from "../components/MyButton";

const Profile = () => {
  const [user, dispatch] = useContext(UserContext);
  const navigation = useNavigation();
  const logout = () => {
    dispatch({
      type: "logout",
    });
    AsyncStorage.clear();
    navigation.replace("Login");
  };
  const requestStoreNavigate = () => {
    navigation.navigate("Request Store");
  };
  const requestingStore = () => {
    Alert.alert("Please Waiting");
  };
  const staffManagerNavigate = () => {
    navigation.navigate("Store Request List");
  };
  const storeManagerNavigate = () => {
    navigation.navigate("Store Manager");
  };
  return (
    <>
      <View
        style={{
          alignItems: "center",
          paddingTop: 20,
          marginBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: "black",
        }}
      >
        <Image
          source={{
            uri: "https://res.cloudinary.com/dm5nn54wh/" + user.avatar,
          }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
          Hello {user.first_name + " " + user.last_name}
        </Text>
      </View>
      <ScrollView>
        {user.is_staff === true ? (
          <MyButton
            callback={staffManagerNavigate}
            text={"Staff Manager"}
          ></MyButton>
        ) : user.store === null ? (
          <MyButton
            callback={requestStoreNavigate}
            text={"Request Store"}
          ></MyButton>
        ) : user.store.active === false ? (
          <MyButton callback={requestingStore} text={"Requesting"}></MyButton>
        ) : (
          <MyButton
            callback={storeManagerNavigate}
            text={"Store Manager"}
          ></MyButton>
        )}

        <Pressable
          onPress={logout}
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
            Log out
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({});
