import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { BackButtonContainer, CreditCard, TextButton } from "../../components";
import { COLORS, FONTS, SIZES, STYLES } from "../../../assets/styles";
import { CreateClientOrder } from "../../utils/ClientControler";
import { AuthContext } from "../../context";

const ProductStoreScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const { user } = React.useContext(AuthContext.Context);
  const [quantity, setQuantity] = React.useState("1");
  const [loading, setLoading] = React.useState(false);
  const [cardDetails, setCardDetails] = React.useState({});

  const handleOrderPress = async () => {
    if (product.quantity === 0) {
      alert("Product sold out!");
      return;
    }
    if (product.quantity < quantity) {
      alert("Not enough stock! only " + product.quantity + " left");
      return;
    }
    if (loading) return;

    if (!cardDetails.isValid) {
      alert("Please fill the card details!");
      return;
    }

    setLoading(true);
    const res = await CreateClientOrder(
      user.uid,
      user.address || "",
      product,
      quantity,
      user.score || 0
    );
    if (!res) {
      alert("Failed to create order");
      setLoading(false);
    } else {
      alert("Order created successfully");
      navigation.goBack();
    }
  };

  return (
    <BackButtonContainer onBackBtnPress={navigation.goBack}>
      {/* product image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: product.imageUrl }}
          style={{ height: "100%", width: SIZES.width }}
          resizeMode="contain"
        />
      </View>
      {/* product details */}
      <View style={{ padding: 10, gap: 20 }}>
        <Text style={[FONTS.h1]}>{product.title}</Text>
        <Text style={[FONTS.caption]}>{product.description}</Text>

        {/* quintity select */}
        <View style={styles.quintityWrapper}>
          <TextInput
            style={{ marginTop: 5, width: 50, height: 50 }}
            autoCapitalize="none"
            autoCorrect={false}
            mode="outlined"
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
            activeOutlineColor={COLORS.primary}
            keyboardType="number-pad"
          />
          <Text style={[[FONTS.h2, { color: COLORS.secondary }]]}>
            x {product.price}
          </Text>
        </View>
        {/* total price */}
        <View style={styles.priceWrapper}>
          <Text style={[FONTS.caption, { fontSize: 24 }]}>Price</Text>
          <Text style={[FONTS.h2, { color: COLORS.secondary }]}>
            {(parseInt(quantity) || 1) * product.price} ₪
          </Text>
        </View>
      </View>

      {/* Credit Card */}
      <CreditCard onChange={(cardDetails) => setCardDetails(cardDetails)} />
      {/* order button */}
      <TextButton
        label="Order Now"
        style={{ margin: 20, marginBottom: 50 }}
        labelStyle={[FONTS.h2]}
        onPress={handleOrderPress}
        loading={loading}
      />
    </BackButtonContainer>
  );
};

export default ProductStoreScreen;

const styles = StyleSheet.create({
  imageWrapper: {
    height: 300,
    width: SIZES.width,
    backgroundColor: COLORS.white,
    padding: 10,
  },
  priceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: COLORS.white,
    ...STYLES.shadow,
    padding: 10,
    borderRadius: 5,
  },
  quintityWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
