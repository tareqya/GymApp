import { StyleSheet, Text, View } from "react-native";
import { Divider, TextInput } from "react-native-paper";
import React, { useContext } from "react";

import { AuthContext } from "../../context";

import { Signin } from "../../utils/AuthControler";

import { Container, TextButton } from "../../components";
import { COLORS, FONTS } from "../../../assets/styles";

const SigninScreen = ({ navigation }) => {
  const { setUser } = useContext(AuthContext.Context);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleLogin = async () => {
    if (loading) return;
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }

    setLoading(true);
    setError(false);
    const _user = await Signin({ email, password });
    if (_user) {
      setUser(_user);
    } else {
      alert("Invalid email or password");
      setError(true);
      setLoading(false);
    }
  };

  return (
    <Container statusBar="dark">
      <View style={styles.container}>
        <Text style={[FONTS.largeTitle]}>Sign In</Text>

        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          label="Email"
          value={email}
          placeholder="test@test.com"
          onChangeText={(text) => setEmail(text)}
          error={error}
          autoCapitalize="none"
          autoCorrect={false}
          activeOutlineColor={COLORS.primary}
        />

        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={{ marginVertical: 10 }}
          mode="outlined"
          label="Password"
          placeholder="**********"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          error={error}
          activeOutlineColor={COLORS.primary}
        />

        <TextButton
          label="Login"
          labelStyle={[FONTS.h2, { color: "white" }]}
          style={{ marginVertical: 20 }}
          onPress={handleLogin}
          loading={loading}
        />

        <Divider />

        <TextButton
          isPrimary={false}
          label="Sign Up"
          labelStyle={[FONTS.h2, { color: COLORS.primary }]}
          style={{ marginVertical: 20 }}
          onPress={() => navigation.navigate("SignupScreen")}
        />
      </View>
    </Container>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
