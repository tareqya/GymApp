import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SigninScreen, SignupScreen } from "../screens/auth-screens";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="SigninScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SigninScreen" component={SigninScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
