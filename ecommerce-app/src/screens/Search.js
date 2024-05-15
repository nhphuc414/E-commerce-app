import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Api, { endpoints } from "../apis/Api";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MyProductItem from "../components/MyProductItem";

const Search = ({ route }) => {
  const [keyword, setKeyword] = useState(route.params?.keyword);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(0);
  const navigation = useNavigation();
  const loadProducts = async () => {
    if (loading || !hasNextPage) return;
    setLoading(true);
    let url = endpoints["products"];
    url = `${url}?page=${page + 1}`;
    if (keyword !== undefined && keyword != null) {
      console.log(keyword);
      url = `${url}&name=${keyword}`;
    }
    try {
      let res = await Api.get(url);
      console.log(url);
      if (res.data.next === null) {
        setHasNextPage(false); // Không có trang kế tiếp
      }
      setProducts([...products, ...res.data.results]);
      setPage(page + 1);
      setLoading(false);
    } catch (ex) {
      setProducts([]);
      console.error(ex);
    }
  };
  useEffect(() => {
    loadProducts();
  }, [keyword]);
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
      <Image
        source={{
          uri: "https://res.cloudinary.com/dm5nn54wh/" + item.image,
        }}
        style={{ width: 200, height: 100 }}
      ></Image>
    </View>
  );

  return (
    <>
      <View
        style={{
          marginTop: 10,
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
            onSubmitEditing={(text) => setKeyword(text)}
          />
        </Pressable>
        <Pressable>
          <AntDesign name="filter" size={24} color="black" />
        </Pressable>
      </View>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {products == [] || products == null ? (
            <Text>No Product</Text>
          ) : (
            <FlatList
              contentContainerStyle={styles.list}
              data={products}
              renderItem={({ item }) => <MyProductItem item={item} />}
              onEndReached={loadProducts}
              keyExtractor={(item) => item.id.toString()}
              onEndReachedThreshold={0.1}
              ListFooterComponent={() =>
                loading ? <ActivityIndicator size="large" /> : null
              }
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
});
