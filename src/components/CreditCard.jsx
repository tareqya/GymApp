import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { COLORS } from "../../assets/styles";

const CreditCard = ({ onChange = () => {} }) => {
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardDate, setCardDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");

  React.useEffect(() => {
    let isValid = true;
    if (!cardNumber.trim() || !cardDate.trim() || !cvv.trim()) {
      isValid = false;
    }

    onChange({ isValid, cardNumber, cardDate, cvv });
  }, [cardNumber, cardDate, cvv]);

  return (
    <View style={styles.container}>
      <TextInput
        style={{ marginVertical: 10 }}
        mode="outlined"
        value={cardNumber}
        placeholder="XXXX XXXX XXXX XXXX"
        onChangeText={(text) => setCardNumber(text)}
        autoCapitalize="none"
        autoCorrect={false}
        activeOutlineColor={COLORS.primary}
        label={"Card Number"}
        keyboardType="decimal-pad"
      />

      <View style={styles.wrapper}>
        <TextInput
          style={{ flex: 1 }}
          mode="outlined"
          value={cardDate}
          placeholder="MM/YY"
          onChangeText={(text) => setCardDate(text)}
          autoCapitalize="none"
          autoCorrect={false}
          activeOutlineColor={COLORS.primary}
          label={"Card Date"}
          keyboardType="decimal-pad"
        />
        <TextInput
          style={{ flex: 1 }}
          mode="outlined"
          value={cvv}
          placeholder="XXXX"
          onChangeText={(text) => setCvv(text)}
          autoCapitalize="none"
          autoCorrect={false}
          activeOutlineColor={COLORS.primary}
          label={"CVV"}
          keyboardType="decimal-pad"
        />
      </View>
    </View>
  );
};

export default CreditCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
});
