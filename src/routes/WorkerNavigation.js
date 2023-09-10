import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  ProfileScreen,
  MyBookingScreen,
  BookingDetailsScreen,
} from "../screens/worker-screens";
import { EditAccountScreen } from "../screens/common-screens";
import { COLORS, Icons } from "../../assets/styles";
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarIconStyle: { top: 10 },
        tabBarLabel: "",
      }}
      initialRouteName="HomeScreen"
    >
      <Tabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={() => {
          return {
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <View>
                  <View style={styles.iconTabBackground} />
                  <View style={styles.tabIconWrapper}>
                    <Icons.HomeIcon color={color} size={size} />
                  </View>
                </View>
              ) : (
                <Icons.HomeIcon color={color} size={size} />
              ),
          };
        }}
      />

      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={() => {
          return {
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <View>
                  <View style={styles.iconTabBackground} />
                  <View style={styles.tabIconWrapper}>
                    <Icons.ProfileIcon color={color} size={size} />
                  </View>
                </View>
              ) : (
                <Icons.ProfileIcon color={color} size={size} />
              ),
          };
        }}
      />
    </Tabs.Navigator>
  );
};

const WorkerNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomNavigation"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="EditAccountScreen" component={EditAccountScreen} />
      <Stack.Screen name="MyBookingScreen" component={MyBookingScreen} />
      <Stack.Screen
        name="BookingDetailsScreen"
        component={BookingDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default WorkerNavigation;

const styles = StyleSheet.create({
  iconTabBackground: {
    height: "100%",
    aspectRatio: 1,
    backgroundColor: COLORS.primary,
    position: "absolute",
    opacity: 0.1,
    borderRadius: 4,
  },
  addQueueBottom: {
    width: 50,
    height: 50,
    top: -20,
    borderRadius: 25,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  tabIconWrapper: {
    height: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
