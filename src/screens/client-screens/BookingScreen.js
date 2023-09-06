import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ActivityIndicator, TextInput } from "react-native-paper";

import {
  Container,
  DatePicker,
  TextButton,
  TimePicker,
} from "../../components";
import { COLORS, FONTS } from "../../../assets/styles";
import { HOURS, MEETING_STATUS, MONTHS } from "../../utils/Globals";
import { BookMeeting, FetchWorkers } from "../../utils/ClientControler";
import images from "../../../assets/images";
import { StringHourMil } from "../../utils/UtilsFunctions";
import { AuthContext } from "../../context";

const BookingScreen = ({ navigation }) => {
  const { user } = React.useContext(AuthContext.Context);
  const [date, setDate] = React.useState(new Date());
  const [hour, setHour] = React.useState(HOURS[0]);
  const [loading, setLoading] = React.useState(true);
  const [booking, setBooking] = React.useState(false);
  const [workers, setWorkers] = React.useState([]);
  const [selectedWorker, setSelectedWorker] = React.useState(null);
  const [subject, setSubject] = React.useState("");
  const [error, setError] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    FetchWorkers()
      .then((workers) => {
        setWorkers(workers);
        setLoading(false);
        if (!workers || workers.length === 0) {
          alert("No workers found");
        }
      })
      .catch(() => setLoading(false));
  }, []);

  const handleBooking = async () => {
    if (booking) return;
    if (!subject) {
      setError(true);
      alert("Please fill all the fields");
      return;
    }
    if (!selectedWorker || !date || !hour) {
      alert("Please fill all the fields");
      return;
    }
    setError(false);
    setBooking(true);
    const hoursInMil = StringHourMil(hour);
    const meetingTime = date.getTime() + hoursInMil;
    const meeting = {
      createTime: new Date().getTime(),
      meetingTime: meetingTime,
      workerUid: selectedWorker.uid,
      status: MEETING_STATUS.pending,
      clientUid: user.uid,
      attachedImages: [],
      subject: subject,
    };
    const result = await BookMeeting(meeting);
    if (!result) {
      alert("Failed to book the meeting");
    } else {
      alert("Successfully booked the meeting");
      navigation.navigate("HomeScreen");
    }
    setBooking(false);
  };

  return (
    <Container>
      <View style={styles.container}>
        <Text style={[FONTS.h1]}>Book meeting with trainer</Text>
        {/* meeting subject */}
        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          label="Subject"
          value={subject}
          placeholder="Meeting subject"
          onChangeText={(text) => setSubject(text)}
          error={error}
          autoCapitalize="none"
          autoCorrect={false}
          activeOutlineColor={COLORS.primary}
        />
        {/* select date */}
        <DatePicker
          onDateChange={(date) => setDate(date)}
          labels={["S", "M", "T", "W", "T", "F", "S"]}
          months={MONTHS}
          selectCurrentDate
          style={{ marginTop: 20 }}
          currentDate={date}
        />
        {/* select hour */}
        <TimePicker
          hours={HOURS}
          selectedTime={hour}
          onTimeSelect={(time) => setHour(time)}
          style={{ marginTop: 20 }}
        />
        {/* select trainer */}
        {loading && (
          <ActivityIndicator
            size={"large"}
            color={COLORS.primary}
            style={{ marginTop: 20 }}
          />
        )}
      </View>
      <FlatList
        style={{ marginTop: 20 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        data={workers}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.workerWrapper]}
            onPress={() => setSelectedWorker(item)}
          >
            <Image
              source={
                item.imageUrl ? { uri: item.imageUrl } : images.PROFILE_IMAGE
              }
              resizeMode="contain"
              style={[styles.workerImage]}
            />
            <Text
              style={[
                selectedWorker && selectedWorker.uid == item.uid
                  ? FONTS.h3
                  : FONTS.caption,
              ]}
            >
              {item.firstname} {item.lastname}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TextButton
        loading={booking}
        label="Book Now"
        style={{ margin: 20, marginTop: 50 }}
        labelStyle={[FONTS.h2]}
        onPress={handleBooking}
      />
    </Container>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  workerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  workerImage: {
    borderRadius: 10,
    height: 120,
    aspectRatio: 1,
  },
});
