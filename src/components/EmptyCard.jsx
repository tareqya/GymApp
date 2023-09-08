import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, FONTS, Images } from "../../assets/styles";

const EmptyCard = ({ msg, labelStyle = {} }) => {
  return (
    <View style={styles.container}>
      <Image source={Images.EMPTY_IMAGE} style={styles.image} />
      <Text style={[styles.msg, labelStyle]}>{msg}</Text>
    </View>
  );
};

export default EmptyCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    height: 250,
    width: 250,
  },
  msg: {
    ...FONTS.body3,
    color: COLORS.text,
  },
});
