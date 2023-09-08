import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BackButtonContainer, EmptyCard, ProgressBar } from "../../components";
import { COLORS, FONTS, STYLES } from "../../../assets/styles";
import { AuthContext } from "../../context";
import { FetchClientOrders } from "../../utils/ClientControler";
import { ActivityIndicator } from "react-native-paper";
import { formatDateAndTime } from "../../utils/UtilsFunctions";
import { ORDER_STATUS } from "../../utils/Globals";
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

  const orderCalPercentage = (order) => {
    switch (order.status) {
      case ORDER_STATUS.pending:
        return 0.1;
      case ORDER_STATUS.cancelled:
        return 0;
      case ORDER_STATUS.shipped:
        return 0.5;
      case ORDER_STATUS.delivered:
        return 1;
      default:
        return 0;
    }
  };

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

        {orders.map((order) => {
          const { product } = order;
          return (
            <View key={order.key} style={styles.orderWrapper}>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Image
                  source={{ uri: product.imageUrl }}
                  style={styles.orderImage}
                  resizeMode="contain"
                />
                <View style={{ flex: 1 }}>
                  <Text style={[FONTS.h2]} numberOfLines={1}>
                    {product.title}
                  </Text>
                  <Text style={[FONTS.body2, { color: COLORS.secondary }]}>
                    {order.totalPrice} ₪
                    <Text style={[FONTS.caption]}> x{order.quantity}</Text>
                  </Text>
                  <Text style={[FONTS.caption]}>
                    Delivery Date:{" "}
                    {formatDateAndTime(new Date(order.deliveryTime))}
                  </Text>
                </View>
              </View>

              <ProgressBar
                style={{ marginTop: 10 }}
                persent={orderCalPercentage(order)}
                title={order.status}
              />

              <Text
                style={[FONTS.caption, { textAlign: "right", marginTop: 5 }]}
              >
                {formatDateAndTime(new Date(order.orderTime))}
              </Text>
            </View>
          );
        })}
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
  orderWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    ...STYLES.shadow,
  },
});
