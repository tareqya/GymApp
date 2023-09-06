import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/trainer-screens";

const Stack = createNativeStackNavigator();

const ClientNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default ClientNavigation;
