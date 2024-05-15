import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Platform,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Api from "../apis/Api";
const Home = () => {
  const [keyword, setKeyword] = useState("");
  const navigation = useNavigation();
  const handleSearch = async () => {
      navigation.navigate("Search", {
        keyword: keyword
      });
  };
  return (
    <SafeAreaView
      style={{
        paddinTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          marginTop: 30,
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput
            value={keyword}
            onChangeText={(text) => setKeyword(text)}
            placeholder="Search Product..."
            onSubmitEditing={handleSearch}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
