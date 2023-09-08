import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { COLORS, FONTS, Icons } from "../../assets/styles";

const ProgressBar = ({ persent, title = "", style = {} }) => {
  const prgressAnimation = useRef(new Animated.Value(0)).current;
  const to = persent * 100;
  useEffect(() => {
    Animated.timing(prgressAnimation, {
      toValue: to,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [persent]);

  const animation = prgressAnimation.interpolate({
    inputRange: [0, to],
    outputRange: ["0%", `${to}%`],
  });

  return (
    <View style={style}>
      <Text style={[FONTS.caption, { marginBottom: 5 }]}>
        {title || Math.floor(persent * 100) + "%"}
      </Text>
      <View style={styles.progressWrapper}>
        <View style={{ flexDirection: "row" }}>
          <Animated.View style={[styles.progress, { width: animation }]} />
          <View style={styles.fireWrapper}>
            <Icons.PackageIcon size={30} color={COLORS.primary} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  progressWrapper: {
    height: 20,
    backgroundColor: COLORS.background,
    borderRadius: 3,
  },
  progress: {
    height: 20,
    backgroundColor: COLORS.green,
  },
  fireWrapper: {
    marginHorizontal: -10,
    marginTop: -6,
    zIndex: 99,
  },
});
