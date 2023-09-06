import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import AuthNaviation from "./AuthNavigation";
import AdminNavigation from "./AdminNavigation";
import TrainerNavigation from "./TrainerNavigation";
import ClientNavigation from "./ClientNavigation";

import { AuthContext, ThemeContext } from "../context";
import { USER_TYPES } from "../utils/Globals";
import { CurrentUser, SyncUser } from "../utils/AuthControler";

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

  if (loading) return null;

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
