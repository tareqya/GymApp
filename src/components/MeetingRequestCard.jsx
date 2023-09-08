import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, FONTS, Icons, Images } from "../../assets/styles";
import { formatTime } from "../utils/UtilsFunctions";
import TextButton from "./TextButton";

const MeetingRequestCard = ({
  meetingTime,
  name,
  subject,
  imageUrl,
  onAccept = () => {},
  onReject = () => {},
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[FONTS.body2, { color: COLORS.white }]}>
          Meeting Request
        </Text>

        <View style={styles.timeWrapper}>
          <Icons.ClockIcon size={25} color={COLORS.white} />
          <Text style={[FONTS.h3, { color: COLORS.white }]}>
            {new Date(meetingTime).toDateString()}
          </Text>
          <Text>{formatTime(new Date(meetingTime))}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.imageWrapper}>
          <Image
            source={imageUrl ? { uri: imageUrl } : Images.PROFILE_IMAGE}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={{ gap: 5 }}>
            <Text style={FONTS.caption}>{subject}</Text>
            <Text style={FONTS.h3}>{name}</Text>
          </View>
        </View>

        <View style={styles.btnsWrapper}>
          <TextButton label="ACCEPT" labelStyle={FONTS.h2} onPress={onAccept} />
          <TextButton
            label="DECLINE"
            isPrimary={false}
            labelStyle={[FONTS.h2, { color: COLORS.lightText }]}
            onPress={onReject}
          />
        </View>
      </View>
    </View>
  );
};

export default MeetingRequestCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 10,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 20,
    paddingHorizontal: 30,
    gap: 10,
  },
  timeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  body: {
    backgroundColor: COLORS.white,
    padding: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 25,
  },
  imageWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  btnsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
});
