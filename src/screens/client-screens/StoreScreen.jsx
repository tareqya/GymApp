import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import React from "react";

import { Container } from "../../components";
import { COLORS, FONTS, Icons, STYLES } from "../../../assets/styles";
import { CATEGORIES } from "../../utils/Globals";
import { FetchStoreProducts } from "../../utils/ClientControler";

const StoreScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = React.useState(CATEGORIES[0]);
  const [fetching, setFetching] = React.useState(true);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    FetchStoreProducts()
      .then((products) => {
        setProducts(products);
        setFilteredProducts(
          products.filter(
            (product) => product.category === selectedCategory.value
          )
        );
      })
      .catch((e) => console.log(e))
      .finally(() => setFetching(false));
  }, []);

  React.useEffect(() => {
    setFilteredProducts(
      products.filter((product) => product.category === selectedCategory.value)
    );
  }, [selectedCategory]);

  const handleSelectProduct = (product) => {
    navigation.navigate("ProductStoreScreen", { product });
  };

  return (
    <Container>
      <View style={styles.container}>
        <Text style={[FONTS.largeTitle, { padding: 10 }]}>Store</Text>
        {/* categories */}
        <Text style={[FONTS.h2, { padding: 10 }]}>Categories</Text>
        <FlatList
          data={CATEGORIES}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryWrapper,
                selectedCategory?.value === item.value && {
                  backgroundColor: COLORS.secondary,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => setSelectedCategory(item)}
            >
              <Image
                source={item.image}
                resizeMode="stretch"
                style={{ height: 50, width: 50 }}
              />
              <Text
                style={[
                  FONTS.h3,
                  selectedCategory.value === item.value && {
                    color: COLORS.white,
                  },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
        {fetching && (
          <ActivityIndicator
            style={{ marginTop: 20 }}
            size={"large"}
            color={COLORS.primary}
          />
        )}
        {/* products */}
        <View style={{ marginTop: 20 }}>
          {filteredProducts.map((product) => (
            <TouchableOpacity
              activeOpacity={0.7}
              key={product.key}
              style={styles.productWrapper}
              onPress={() => handleSelectProduct(product)}
            >
              <View style={{ flex: 2, gap: 10 }}>
                <Text style={[FONTS.h2]} numberOfLines={1}>
                  {product.title}
                </Text>
                <Text style={[FONTS.caption]} numberOfLines={1}>
                  {product.description}
                </Text>
                <Text style={[FONTS.h3, { color: COLORS.secondary }]}>
                  1x{product.price} ₪
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Image
                  source={{ uri: product.imageUrl }}
                  resizeMode="contain"
                  style={{ height: 100, width: 100 }}
                />

                <View style={styles.iconWrapper}>
                  <Icons.RightArrowIcon color={COLORS.white} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Container>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryWrapper: {
    height: 180,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginHorizontal: 10,
    gap: 10,
  },
  productWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 10,
    ...STYLES.shadow,
    paddingTop: 10,
    paddingStart: 10,
  },
  iconWrapper: {
    backgroundColor: COLORS.secondary,
    alignSelf: "flex-end",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderBottomEndRadius: 10,
  },
});
