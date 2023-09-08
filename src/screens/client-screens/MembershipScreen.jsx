import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BackButtonContainer, TextButton } from "../../components";
import { AuthContext } from "../../context";
import { COLORS, FONTS, Icons, SIZES } from "../../../assets/styles";
import { Divider } from "react-native-paper";
import { UpdateClientSubscription } from "../../utils/ClientControler";
import { formatDateAndTime } from "../../utils/UtilsFunctions";

const PLANS = [
  { price: 500, months: 3, id: "1", color: COLORS.secondary },
  { price: 800, months: 5, id: "2", color: "#5C89AA" },
];

const MembershipScreen = ({ navigation }) => {
  const { user, setUser } = React.useContext(AuthContext.Context);
  const [selectedPlan, setSelectedPlan] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubscription = async () => {
    if (loading) return;

    if (!selectedPlan) {
      alert("Please select a plan");
      return;
    }

    setLoading(true);
    const subscriptionTime = await UpdateClientSubscription(
      user.uid,
      selectedPlan.months
    );

    setUser({ ...user, subscription: subscriptionTime });
    setLoading(false);
    alert("Subscription successfully updated");
    navigation.goBack();
  };

  return (
    <BackButtonContainer onBackBtnPress={navigation.goBack}>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          {user.subscription ? (
            <Text style={[FONTS.h3]}>
              Your Subscribtion over on{" "}
              <Text style={{ color: COLORS.secondary }}>
                {formatDateAndTime(new Date(user.subscription))}
              </Text>
            </Text>
          ) : (
            <Text style={[FONTS.h3, { color: COLORS.danger }]}>
              Your Subscribtion is over
            </Text>
          )}
        </View>

        {/* plans */}
        <View style={{ marginTop: 10 }}>
          <Text style={[FONTS.h2]}>Select Plan</Text>
          <View style={styles.plansWrapper}>
            {PLANS.map((plan, index) => (
              <TouchableOpacity
                key={index.toString()}
                style={[
                  styles.planWrapper,
                  {
                    borderColor:
                      plan.id == selectedPlan?.id
                        ? COLORS.secondary
                        : "#E1E1E1",
                  },
                ]}
                onPress={() => setSelectedPlan(plan)}
              >
                <Text style={styles.planMonths}>
                  {plan.months}
                  {" Months"}
                </Text>
                <Text style={[FONTS.h2, { color: plan.color }]}>
                  {plan.price}
                  {" ₪"}
                </Text>
                <View>
                  <Divider bold />
                  <View style={styles.optionWrapper}>
                    <Icons.CheckIcon color={COLORS.green} size={30} />
                    <Text style={[FONTS.body3]}>Gym</Text>
                  </View>
                  <View style={styles.optionWrapper}>
                    <Icons.CheckIcon color={COLORS.green} size={30} />
                    <Text style={[FONTS.body3]}>Pool</Text>
                  </View>
                  <View style={styles.optionWrapper}>
                    <Icons.CheckIcon color={COLORS.green} size={30} />
                    <Text style={[FONTS.body3]}>Sauna</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* selected plan summary */}
        <View style={styles.totalWrapper}>
          <View style={styles.summry}>
            <Text style={FONTS.body2}>Plan</Text>
            <Text style={[FONTS.caption]}>{selectedPlan?.months} Months</Text>
          </View>
          <Divider />
          <View style={styles.summry}>
            <Text style={FONTS.body2}>Total price </Text>
            <Text style={FONTS.h2}>{selectedPlan?.price} ₪</Text>
          </View>
        </View>

        <TextButton
          label="Subscribe"
          loading={loading}
          style={{ marginTop: 20 }}
          labelStyle={FONTS.h2}
          onPress={handleSubscription}
        />
      </View>
    </BackButtonContainer>
  );
};

export default MembershipScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ACCFE9",
    borderRadius: 10,
    gap: 10,
  },
  planMonths: {
    fontSize: 18,
    color: COLORS.text,
    marginVertical: 10,
    fontWeight: "bold",
  },
  planPrice: {
    fontWeight: "bold",
    fontSize: 24,
    color: COLORS.secondary,
  },
  plansWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  planWrapper: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E1E1E1",
    padding: 20,
    borderRadius: 10,
    height: 230,
    borderWidth: 2,
    width: SIZES.width / 2.3,
  },
  buttonsWrapper: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  optionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  summry: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  totalWrapper: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    padding: 20,
  },
  staticsSlide: {
    position: "absolute",
    bottom: 0,
    height: SIZES.height / 1.1,
    width: SIZES.width,
    backgroundColor: COLORS.background,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 10,
  },
  summryTitle: {
    fontSize: 18,
    color: COLORS.text,
    flex: 1,
    textAlign: "center",
  },
  summry: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
