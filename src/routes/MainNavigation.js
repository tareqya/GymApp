import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native-paper";

import AuthNaviation from "./AuthNavigation";
import AdminNavigation from "./AdminNavigation";
import TrainerNavigation from "./WorkerNavigation";
import ClientNavigation from "./ClientNavigation";

import { AuthContext, ThemeContext } from "../context";
import { USER_TYPES } from "../utils/Globals";
import { CurrentUser, SyncUser } from "../utils/AuthControler";
import { COLORS, FONTS } from "../../assets/styles";

const HomeRouter = ({ currentUser }) => {
  if (currentUser.accountType === USER_TYPES.admin) {
    return <AdminNavigation />;
  } else if (currentUser.accountType === USER_TYPES.worker) {
    return <TrainerNavigation />;
  } else {
    return <ClientNavigation />;
  }
};

const MainNavigation = () => {
  const [loading, setLoading] = React.useState(true);
  const { user, setUser } = React.useContext(AuthContext.Context);
  const { theme } = React.useContext(ThemeContext.Context);
  const SyncData = async () => {
    const _currentUser = await CurrentUser();
    if (!_currentUser) {
      setUser(undefined);
    } else {
      const _user = await SyncUser({ uid: _currentUser.uid });
      setUser(_user);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    SyncData();
  }, []);

  if (loading)
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size={"large"} color={COLORS.primary} />
        <Text style={FONTS.body2}>Loading...</Text>
      </View>
    );

  return (
    <>
      <StatusBar style={theme} />
      <NavigationContainer>
        {!user ? <AuthNaviation /> : <HomeRouter currentUser={user} />}
      </NavigationContainer>
    </>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
