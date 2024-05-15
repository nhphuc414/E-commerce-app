import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import MyButton from "../../components/MyButton";

const StoreManager = () => {
  const navigation = useNavigation();
  const addProductNavigate = () => {
    navigation.navigate("Add Product");
  };
  const statsNavigate = () => {
    navigation.navigate("Statistic");
  };
  return (
    <ScrollView>
      <MyButton callback={addProductNavigate} text={"Add Product"}></MyButton>
      <MyButton callback={statsNavigate} text={"Statistic"}></MyButton>
    </ScrollView>
  );
};

export default StoreManager;

const styles = StyleSheet.create({});
