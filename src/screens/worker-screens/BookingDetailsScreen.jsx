import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import * as Linking from "expo-linking";
import * as ImagePicker from "expo-image-picker";

import {
  BackButtonContainer,
  Dialog,
  EmptyCard,
  TextButton,
} from "../../components";
import {
  COLORS,
  FONTS,
  Icons,
  Images,
  SIZES,
  STYLES,
} from "../../../assets/styles";
import { UploadClientMeetingImage } from "../../utils/ClientControler";

import { FetchWorkerClientMeeting } from "../../utils/WorkerControler";

const BookingDetailsScreen = ({ navigation, route }) => {
  const { meetingKey } = route.params;
  const [meeting, setMeeting] = React.useState(null);
  const [fetching, setFetching] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  React.useEffect(() => {
    FetchWorkerClientMeeting(meetingKey)
      .then((meeting) => setMeeting(meeting))
      .catch((error) => console.log(error))
      .finally(() => setFetching(false));
  }, []);

  const handleCallPress = async () => {
    const phoneNumber = meeting.client.phone.slice(1);
    const res = await Linking.canOpenURL(`tel:+972${phoneNumber}`);
    if (res) {
      await Linking.openURL(`tel:+972${phoneNumber}`);
    } else {
      alert("Device not support phone calls");
    }
  };

  const handleUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);
      const image = await UploadClientMeetingImage(
        meeting.attachedImages,
        result.assets[0].uri,
        meetingKey
      );
      if (image) {
        setMeeting({
          ...meeting,
          attachedImages: [...meeting.attachedImages, image],
        });
      } else {
        alert("Failed to upload image");
      }

      setLoading(false);
    }
  };

  return (
    <BackButtonContainer onBackBtnPress={navigation.goBack}>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <ImageBackground
          source={{ uri: selectedImage?.imageUrl }}
          resizeMode="contain"
          style={styles.bigImageWrapper}
        >
          <Pressable
            style={{ height: "100%" }}
            onPress={() => setVisible(false)}
          />
        </ImageBackground>
      </Dialog>
      <View style={styles.container}>
        {fetching && (
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        )}

        {!fetching && meeting && (
          <>
            {/* header */}
            <View style={styles.headerWrapper}>
              <View
                style={[styles.headerWrapper, { justifyContent: "flex-start" }]}
              >
                <Image
                  source={
                    meeting.client.imageUrl
                      ? { uri: meeting.client.imageUrl }
                      : Images.PROFILE_IMAGE
                  }
                  style={{ height: 60, width: 60, borderRadius: 30 }}
                  resizeMode="contain"
                />
                <View>
                  <Text style={[FONTS.caption]}>{meeting.subject}</Text>
                  <Text style={[FONTS.h3]}>
                    {meeting.client.firstname} {meeting.client.lastname}
                  </Text>
                </View>
              </View>

              {/* phone button */}
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.phoneBtn}
                onPress={handleCallPress}
              >
                <Icons.PhoneIcon color={COLORS.white} />
              </TouchableOpacity>
            </View>

            {/* upload button */}
            <TextButton
              loading={loading}
              label="Upload Image"
              labelStyle={[FONTS.h2]}
              style={{ marginTop: 10 }}
              onPress={handleUploadImage}
            />

            {/* attached images  */}
            {meeting.attachedImages?.length > 0 ? (
              <>
                <Text style={[FONTS.h1, { marginTop: 20 }]}>
                  Attached Photos
                </Text>
                <View style={styles.imagesWrapper}>
                  {meeting.attachedImages.map((image) => (
                    <View
                      key={image.uploadTime.toString()}
                      style={{ marginBottom: 20 }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          setSelectedImage(image);
                          setVisible(true);
                        }}
                      >
                        <Image
                          key={image.id}
                          source={{ uri: image.imageUrl }}
                          style={{ height: 100, width: 100, borderRadius: 5 }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </>
            ) : (
              <EmptyCard msg={"No images found!"} />
            )}
          </>
        )}
      </View>
    </BackButtonContainer>
  );
};

export default BookingDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },
  phoneBtn: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.green,
    borderRadius: 20,
    ...STYLES.shadow,
  },
  imagesWrapper: {
    flex: 1,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: COLORS.white,
    padding: 10,
    paddingHorizontal: 15,
    ...STYLES.shadow,
    borderRadius: 10,
    minHeight: SIZES.height / 3,
  },
  removeImageBtn: {
    backgroundColor: COLORS.danger,
    height: 25,
    width: 25,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 99,
    top: -10,
    right: -10,
  },
  bigImageWrapper: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 10,
  },
});
