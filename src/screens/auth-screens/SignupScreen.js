import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

import { BackButtonContainer, TextButton } from "../../components";
import { COLORS, FONTS } from "../../../assets/styles";
import { Signout, Signup } from "../../utils/AuthControler";
import { USER_TYPES } from "../../utils/Globals";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstname, setFirstName] = React.useState("");
  const [lastname, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleCreateAccount = async () => {
    if (loading) return;
    if (!email || !password || !firstname || !lastname || !phone) {
      alert("All fields are required");
      return;
    }

    setError(false);
    setLoading(true);
    const _user = await Signup({
      email,
      password,
      userInfo: { firstname, lastname, phone, accountType: USER_TYPES.client },
    });
    if (_user) {
      await Signout();
      alert("Account created successfully");
      navigation.goBack();
    } else {
      alert("Failed to create account");
      setLoading(false);
      setError(true);
    }
  };

  return (
    <BackButtonContainer
      statusBar="dark"
      onBackBtnPress={() => navigation.goBack()}
    >
      <View style={styles.container}>
        <Text style={[FONTS.largeTitle]}>Sign Up</Text>
        <KeyboardAvoidingView>
          <TextInput
            style={{ marginTop: 10 }}
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
            style={{ marginTop: 5 }}
            autoCapitalize="none"
            autoCorrect={false}
            mode="outlined"
            label="Password"
            placeholder="**********"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            error={error}
            activeOutlineColor={COLORS.primary}
          />

          <TextInput
            style={{ marginTop: 5 }}
            autoCapitalize="none"
            autoCorrect={false}
            mode="outlined"
            label="First Name"
            placeholder="Your first name"
            value={firstname}
            onChangeText={(text) => setFirstName(text)}
            error={error}
            activeOutlineColor={COLORS.primary}
          />

          <TextInput
            style={{ marginTop: 5 }}
            autoCapitalize="none"
            autoCorrect={false}
            mode="outlined"
            label="Last Name"
            placeholder="Your last name"
            value={lastname}
            onChangeText={(text) => setLastName(text)}
            error={error}
            activeOutlineColor={COLORS.primary}
          />

          <TextInput
            style={{ marginTop: 5 }}
            autoCapitalize="none"
            autoCorrect={false}
            mode="outlined"
            label="Phone"
            placeholder="Your phone number"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            error={error}
            activeOutlineColor={COLORS.primary}
            keyboardType="number-pad"
          />
        </KeyboardAvoidingView>

        <TextButton
          label="Sigin Up"
          labelStyle={[FONTS.h2, { color: "white" }]}
          style={{ marginVertical: 50 }}
          loading={loading}
          onPress={handleCreateAccount}
        />
      </View>
    </BackButtonContainer>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
