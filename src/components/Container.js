import { StyleSheet, SafeAreaView, View, FlatList } from "react-native";
import React from "react";
import { COLORS } from "../../assets/styles";
import { ThemeContext } from "../context";
import { useFocusEffect } from "@react-navigation/native";

const Container = ({
  children,
  safeAreaBackground,
  style,
  statusBar = "dark",
}) => {
  const { setTheme } = React.useContext(ThemeContext.Context);

  useFocusEffect(() => {
    setTheme(statusBar);
  });

  return (
    <View style={[styles.container, style]}>
      <SafeAreaView
        style={[
          styles.safeArea,
          { backgroundColor: safeAreaBackground || COLORS.background },
        ]}
      />
      <FlatList
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={[children]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <>{item}</>}
      />
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    paddingTop: Platform.OS == "ios" ? 0 : 40,
  },
});
