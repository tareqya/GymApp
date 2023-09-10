import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Divider } from "react-native-paper";

import { Container } from "../../components";
import { COLORS, FONTS, Icons, Images, SIZES } from "../../../assets/styles";
import { AuthContext } from "../../context";
import { Signout } from "../../utils/AuthControler";

const ProfileScreen = ({ navigation }) => {
  const { user, setUser } = React.useContext(AuthContext.Context);

  const handleLogout = async () => {
    const res = await Signout();
    if (!res) alert("Failed to logout");
    else {
      setUser(undefined);
    }
  };

  return (
    <Container
      statusBar="light"
      style={{ backgroundColor: COLORS.primary }}
      safeAreaBackground={COLORS.primary}
    >
      <View style={styles.container}>
        {/* header */}
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

          <Text style={[FONTS.h3]}>
            {user.firstname} {user.lastname}
          </Text>
          <Text style={[FONTS.caption]}>{user.score || "0"}</Text>
        </View>
        {/* options wrapper */}
        <View style={{ marginTop: 20 }}>
          {/* Edit user details */}
          <TouchableOpacity
            onPress={() => navigation.navigate("EditAccountScreen")}
            activeOpacity={0.7}
            style={styles.buttonWrapper}
          >
            <View style={styles.buttonInfoWrapper}>
              <View style={styles.iconWrapper}>
                <Icons.ProfileIcon />
              </View>
              <Text style={FONTS.body3}>Edit account details</Text>
            </View>
            <Icons.RightArrowIcon />
          </TouchableOpacity>
          <Divider bold />
          {/* orders  */}
          <TouchableOpacity
            onPress={() => navigation.navigate("OrdersScreen")}
            activeOpacity={0.7}
            style={styles.buttonWrapper}
          >
            <View style={styles.buttonInfoWrapper}>
              <View style={styles.iconWrapper}>
                <Icons.CartIcon />
              </View>
              <Text style={FONTS.body3}>My orders</Text>
            </View>
            <Icons.RightArrowIcon />
          </TouchableOpacity>
          <Divider bold />
          {/* my books */}
          <TouchableOpacity
            onPress={() => navigation.navigate("MyBookingScreen")}
            activeOpacity={0.7}
            style={styles.buttonWrapper}
          >
            <View style={styles.buttonInfoWrapper}>
              <View style={styles.iconWrapper}>
                <Icons.CalendarIcon />
              </View>
              <Text style={FONTS.body3}>My Booking</Text>
            </View>
            <Icons.RightArrowIcon />
          </TouchableOpacity>
          <Divider bold />
          {/* membership */}
          <TouchableOpacity
            onPress={() => navigation.navigate("MembershipScreen")}
            activeOpacity={0.7}
            style={styles.buttonWrapper}
          >
            <View style={styles.buttonInfoWrapper}>
              <View style={styles.iconWrapper}>
                <Icons.LoopIcon />
              </View>
              <Text style={FONTS.body3}>Membership</Text>
            </View>
            <Icons.RightArrowIcon />
          </TouchableOpacity>
        </View>
        {/* logout */}
        <View style={styles.logoutWrapper}>
          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.7}
            style={styles.logoutBtnWrapper}
          >
            <Icons.LogoutIcon color={COLORS.danger} />
            <Text style={[FONTS.body3, { color: COLORS.danger }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    marginTop: 100,
    height: SIZES.height - 100,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    padding: 20,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -60,
  },
  profileImageWrapper: {
    padding: 5,
    backgroundColor: COLORS.background,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  buttonInfoWrapper: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: COLORS.lightGray,
    padding: 2,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutBtnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoutWrapper: {
    marginTop: 100,
    alignSelf: "flex-start",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
