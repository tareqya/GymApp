import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import { BackButtonContainer, TextButton } from "../../components";
import { COLORS, FONTS, Images } from "../../../assets/styles";
import { AuthContext } from "../../context";
import {
  UpdateProfileAccount,
  UploadProfileImage,
} from "../../utils/CommonControler";

const EditAccountScreen = ({ navigation }) => {
  const { user, setUser } = React.useContext(AuthContext.Context);
  const [lastname, setLastName] = React.useState(user.lastname);
  const [firstname, setFirstName] = React.useState(user.firstname);
  const [address, setAddress] = React.useState(user.address || "");
  const [phone, setPhone] = React.useState(user.phone || "");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(user.imageUrl || "");

  const handleUpdateAccount = async () => {
    if (!firstname || !lastname || !phone) {
      alert("Please fill all the fields");
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);
    const _user = {
      uid: user.uid,
      email: user.email,
      accountType: user.accountType,
      firstname,
      lastname,
      address,
      phone,
    };
    const result = await UpdateProfileAccount(_user);
    if (!result) {
      alert("Failed to update profile");
      setLoading(false);
    } else {
      alert("Profile updated successfully");
      setUser({ ...user, ..._user });
      navigation.goBack();
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const _imageUrl = await UploadProfileImage(
        result.assets[0].uri,
        user.uid
      );
      if (_imageUrl) {
        const _user = { ...user, imageUrl: _imageUrl };
        setUser(_user);
        alert("Image uploaded successfully");
      } else {
        alert("Image upload failed");
      }
    }
  };

  return (
    <BackButtonContainer onBackBtnPress={navigation.goBack}>
      <View style={{ padding: 10 }}>
        <Text style={[FONTS.largeTitle]}>Edit Account</Text>
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          activeOpacity={0.7}
          onPress={() => pickImage()}
        >
          <Image
            source={image ? { uri: image } : Images.PROFILE_IMAGE}
            resizeMode="contain"
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </TouchableOpacity>

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

        <TextInput
          style={{ marginTop: 5 }}
          autoCapitalize="none"
          autoCorrect={false}
          mode="outlined"
          label="Address"
          placeholder="Your address (Optional)"
          value={address}
          onChangeText={(text) => setAddress(text)}
          activeOutlineColor={COLORS.primary}
        />

        <TextButton
          label="Update Account"
          labelStyle={[FONTS.h2]}
          style={{ marginTop: 40 }}
          loading={loading}
          onPress={handleUpdateAccount}
        />
      </View>
    </BackButtonContainer>
  );
};

export default EditAccountScreen;

const styles = StyleSheet.create({});
