import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const MyButton = ({ callback, text }) => {
  return (
    <Pressable
      onPress={callback}
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
        {text}
      </Text>
    </Pressable>
  );
};

export default MyButton;

const styles = StyleSheet.create({});
