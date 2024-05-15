import React, { useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./src/navigations/StackNavigator";
import UserContext from "./src/contexts/UserContext";
import MyUserReducer from "./src/reducers/UserReducer";
import CartProvider from "./src/contexts/CartContext";
export default function App() {
  const [user, dispatch] = useReducer(MyUserReducer, null);
  return (
    <CartProvider>
      <UserContext.Provider value={[user, dispatch]}>
        <StackNavigator></StackNavigator>
      </UserContext.Provider>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
