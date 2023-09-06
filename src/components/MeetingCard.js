import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS, Images, STYLES } from "../../assets/styles";
import { formatDateAndTime, formatTime } from "../utils/UtilsFunctions";
import Icons from "../../assets/styles/icons";
import { MEETING_STATUS } from "../utils/Globals";

const MeetingCard = ({
  name,
  date,
  subject,
  status,
  onPress = () => {},
  imageUrl = "",
  style = {},
}) => {
  const statusColor = () => {
    switch (status) {
      case MEETING_STATUS.accepted:
        return COLORS.green;
      case MEETING_STATUS.rejected:
        return COLORS.danger;
      case MEETING_STATUS.pending:
        return COLORS.yellow;
      default:
        return COLORS.yellow;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.container, style]}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image
          source={imageUrl ? { uri: imageUrl } : Images.PROFILE_IMAGE}
          style={styles.image}
          resizeMode="contain"
        />
        <View>
          <Text style={FONTS.caption}>{subject}</Text>
          <Text style={[FONTS.h2]}>{name}</Text>
          <View
            style={[
              styles.statusWrapper,
              {
                backgroundColor: statusColor(),
              },
            ]}
          >
            <Text style={[FONTS.h4, { color: COLORS.white }]}>{status}</Text>
          </View>
        </View>
      </View>

      <View style={{ gap: 10, alignItems: "center" }}>
        <View style={styles.arrowWrapper}>
          <Icons.RightArrowIcon />
        </View>
        <Text style={FONTS.body4}>{formatDateAndTime(date)}</Text>
        <Text style={FONTS.body4}>{formatTime(date)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MeetingCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    ...STYLES.shadow,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  arrowWrapper: {
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  statusWrapper: {
    padding: 5,
    alignItems: "center",
    borderRadius: 5,
    width: 110,
  },
});
