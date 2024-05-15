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
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Api, { authApi, endpoints } from "../apis/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../contexts/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, dispatch] = useContext(UserContext);
  const navigation = useNavigation();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("access-token");

        if (token) {
          navigation.replace("Main");
        }
      } catch (err) {
        console.log("error message", err);
      }
    };
    checkLoginStatus();
  }, []);
  const handleLogin = async () => {
    try {
      
      let res = await Api.post(
        endpoints["login"],
        {
          username: username,
          password: password,
          client_id: "zYWe1EEuv8n6LGK6W9GGBB5g56EjtsRWo02OEXLT",
          client_secret:
            "z1VAQzfCkGPP6xvM5hwEf0nnUp70pSKmgaMNjwYkoJpPvgU76zE8r9JUMBlBBaPLxnq4r17bTIPxMS2CYcmuubPwTI2QvT9akUOEtFoM14kwvvZjS3D7RWOFx1Xj4NrB",
          grant_type: "password",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await AsyncStorage.setItem("access-token", res.data.access_token);
      let user = await authApi(res.data.access_token).get(
        endpoints["current-user"]
      );
      dispatch({
        type: "login",
        payload: user.data,
      });
      
      navigation.replace("Main");
    } catch (ex) {
      Alert.alert("Login Error", "An error occurred while login");
      console.log("Login failed", ex);
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
            Login In to your Account
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
            <AntDesign name="user" size={24} color="black" />

            <TextInput
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: username ? 16 : 16,
              }}
              placeholder="enter your Username"
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
            <AntDesign
              name="lock1"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="enter your Password"
            />
          </View>
        </View>

        <View style={{ marginTop: 80 }} />

        <Pressable
          onPress={handleLogin}
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
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
