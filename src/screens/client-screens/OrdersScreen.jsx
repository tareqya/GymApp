import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BackButtonContainer, EmptyCard } from "../../components";
import { COLORS, FONTS } from "../../../assets/styles";
import { AuthContext } from "../../context";
import { FetchClientOrders } from "../../utils/ClientControler";
import { ActivityIndicator } from "react-native-paper";
const OrdersScreen = ({ navigation }) => {
  const { user } = React.useContext(AuthContext.Context);
  const [orders, setOrders] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);

  React.useEffect(() => {
    FetchClientOrders(user.uid)
      .then((orders) => setOrders(orders))
      .catch((err) => alert(err.message))
      .finally(() => setFetching(false));
  }, []);
  console.log(orders);
  return (
    <BackButtonContainer onBackBtnPress={navigation.goBack}>
      <View style={styles.container}>
        <Text style={FONTS.largeTitle}>Orders</Text>

        {fetching && (
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        )}

        {!fetching && orders.length === 0 && (
          <EmptyCard msg={"No orders found!"} />
        )}

        {orders.map((order) => (
          <View key={order.key}>
            <View>
              <Image
                source={{ uri: order.product.imageUrl }}
                style={styles.orderImage}
                resizeMode="contain"
              />
            </View>
            <View></View>
          </View>
        ))}
      </View>
    </BackButtonContainer>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  orderImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
