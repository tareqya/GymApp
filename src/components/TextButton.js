import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import { COLORS } from "../../assets/styles";

const TextButton = ({
  labelStyle = {},
  onPress = () => {},
  style = {},
  label = "",
  isPrimary = true,
  loading = false,
}) => {
  return (
    <Button
      loading={loading}
      mode={isPrimary ? "contained" : "outlined"}
      rippleColor={"rgb(0, 0, 0, 0.1)"}
      style={[
        styles.btn,
        { backgroundColor: isPrimary ? COLORS.primary : "" },
        style,
      ]}
      onPress={onPress}
      labelStyle={labelStyle}
    >
      {label}
    </Button>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  btn: {
    flex: 1,
  },
});
