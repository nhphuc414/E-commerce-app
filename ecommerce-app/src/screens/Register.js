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
import Api, { endpoints } from "../apis/Api";
const Register = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
    avatar: "",
  });
  const change = (field, value) => {
    setUser((current) => {
      return { ...current, [field]: value };
    });
  };
  const navigation = useNavigation();
  const handleRegister = async () => {
    const form = new FormData();
    for (let key in user)
      if (key === "avatar") {
        form.append(key, {
          uri: user[key].uri,
          name: user[key].fileName,
          type: user[key].type,
        });
      } else form.append(key, user[key]);

    try {
      console.log(form);
      let res = await Api.post(endpoints["register"], form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Alert.alert(
        "Registration successful",
        "You have been registered Successfully"
      );
      navigation.goBack();
    } catch (ex) {
      Alert.alert("Registration Error", "An error occurred while registering");
      console.log("registration failed", ex);
    }
  };
  const picker = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission Denied!");
    } else {
      let res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled) {
        change("avatar", res.assets[0]);
      }
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
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 12,
                color: "#041E42",
              }}
            >
              Register to your Account
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
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="drive-file-rename-outline"
                size={24}
                color="black"
              />
              <TextInput
                value={user.first_name}
                onChangeText={(t) => change("first_name", t)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: user.first_name ? 16 : 16,
                }}
                placeholder="enter your First Name"
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
                value={user.last_name}
                onChangeText={(t) => change("last_name", t)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: user.last_name ? 16 : 16,
                }}
                placeholder="enter your Last Name"
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
                value={user.email}
                onChangeText={(t) => change("email", t)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: user.email ? 16 : 16,
                }}
                placeholder="enter your Email"
              />
            </View>
          </View>
          <View>
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
              <AntDesign
                style={{ marginLeft: 8 }}
                name="user"
                size={24}
                color="black"
              />
              <TextInput
                value={user.username}
                onChangeText={(t) => change("username", t)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: user.username ? 16 : 16,
                }}
                placeholder="enter your Username"
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
              <AntDesign
                name="lock1"
                size={24}
                color="gray"
                style={{ marginLeft: 8 }}
              />

              <TextInput
                value={user.password}
                onChangeText={(t) => change("password", t)}
                secureTextEntry={true}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: user.password ? 16 : 16,
                }}
                placeholder="enter your Password"
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>Keep me logged in</Text>

            <Text style={{ color: "#007FFF", fontWeight: "500" }}>
              Forgot Password
            </Text>
          </View>
          {user.avatar ? (
            <Image
              style={{
                width: 80,
                height: 80,
                marginHorizontal: "auto",
                marginTop: 10,
              }}
              source={{ uri: user.avatar.uri }}
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
              Select Avatar...
            </Text>
          </Pressable>
          <Pressable
            onPress={handleRegister}
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
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Already have an account? Sign In
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({});
