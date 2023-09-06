import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/admin-screens";

const Stack = createNativeStackNavigator();

const AdmnNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AdmnNavigation;
