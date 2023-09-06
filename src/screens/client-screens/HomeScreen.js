import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import { Container } from "../../components";
import { AuthContext } from "../../context";
import { COLORS, FONTS, Icons, Images, SIZES } from "../../../assets/styles";
import { GYM_NAME, GYM_LOCATION, WORK_TIMES } from "../../utils/Globals";
import { Divider } from "react-native-paper";

const HomeScreen = () => {
  const { user } = React.useContext(AuthContext.Context);

  return (
    <Container statusBar="light" safeAreaBackground={COLORS.primary}>
      <View style={styles.container}>
        {/* header user name */}
        <View style={styles.header}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={
                user.imageUrl ? { uri: user.imageUrl } : Images.PROFILE_IMAGE
              }
              style={styles.profileImage}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={[FONTS.body2, { color: COLORS.white }]}>
              Hello <Text style={[FONTS.h2]}>{user.firstname}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* gym image */}
          <View style={{ gap: 10 }}>
            <Image
              source={Images.BACKGROUND_IMAGE}
              style={styles.bgImage}
              resizeMode="stretch"
            />
            <Text style={[FONTS.h3]}>{GYM_NAME}</Text>
          </View>
          {/* details */}
          <View style={styles.detailsWrapper}>
            <View style={styles.locationWrapper}>
              <Icons.LocationIcon color={COLORS.lightText} size={25} />
              <Text style={[FONTS.caption]}>{GYM_LOCATION}</Text>
            </View>
            <View style={styles.locationWrapper}>
              <Icons.ClockIcon color={COLORS.lightText} size={25} />
              <Text style={[FONTS.caption]}>{WORK_TIMES}</Text>
            </View>
          </View>

          <Divider bold />
          {/*  */}
          <View style={styles.galleryWrapper}>
            <Text style={[FONTS.h2, { marginVertical: 10 }]}>Gym Photos</Text>
            <View style={styles.galleryPhotosWrapper}>
              <View style={styles.galleryBigPhotoWrapper}>
                <Image
                  source={Images.IMAGE1_IMAGE}
                  style={styles.galleryPrimaryImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.gallerySmallPhotosWrapper}>
                <View style={styles.gallerySecondaryImageWrapper}>
                  <Image
                    source={Images.IMAGE2_IMAGE}
                    style={styles.gallerySecondaryImage}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.gallerySecondaryImageWrapper}>
                  <Image
                    source={Images.IMAGE3_IMAGE}
                    style={styles.gallerySecondaryImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  container: {
    flex: 1,
    height: SIZES.height,
    backgroundColor: COLORS.primary,
  },
  body: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: COLORS.background,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
  },
  bgImage: {
    width: SIZES.width - 30,
    height: 200,
    alignSelf: "center",

    borderRadius: 10,
  },
  detailsWrapper: {
    marginVertical: 10,
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  galleryPhotosWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  galleryBigPhotoWrapper: {
    height: SIZES.width * 0.9,
    width: SIZES.width / 2.1,
  },
  galleryPrimaryImage: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  gallerySecondaryImageWrapper: {
    height: SIZES.width * 0.4,
    width: SIZES.width / 2.5,
    borderRadius: 10,
    overflow: "hidden",
  },
  gallerySmallPhotosWrapper: {
    justifyContent: "space-between",
  },
  gallerySecondaryImage: {
    height: "100%",
    width: "100%",
  },
});
