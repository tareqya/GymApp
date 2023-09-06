import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Container from "./Container";
import { COLORS, Icons } from "../../assets/styles";

const BackButtonContainer = ({
  children,
  style,
  onBackBtnPress = () => {},
  statusBar = "dark",
}) => {
  return (
    <Container style={[styles.container, style]} statusBar={statusBar}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.backbuttonWrapper}
        onPress={onBackBtnPress}
      >
        <Icons.RightArrowIcon />
      </TouchableOpacity>
      {children}
    </Container>
  );
};

export default BackButtonContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
  },
  backbuttonWrapper: {
    borderWidth: 1,
    margin: 10,
    borderColor: "gray",
    alignSelf: "flex-end",
    borderRadius: 5,
    padding: 2,
  },
});
