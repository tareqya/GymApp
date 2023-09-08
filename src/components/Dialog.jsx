import * as React from "react";
import { StyleSheet, Pressable, View, Modal } from "react-native";
import { SIZES } from "../../assets/styles";

const Dialog = ({ children, visible, onDismiss = () => {}, style = {} }) => {
  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
    >
      <View style={styles.centeredView}>
        <Pressable style={styles.background} onPress={onDismiss} />
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    height: SIZES.height,
    width: SIZES.width,
    backgroundColor: "black",
    opacity: 0.5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Dialog;
