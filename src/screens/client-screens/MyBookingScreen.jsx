import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BackButtonContainer, EmptyCard, MeetingCard } from "../../components";
import { AuthContext } from "../../context";
import { FetchClientMeetings } from "../../utils/ClientControler";
import { COLORS, FONTS } from "../../../assets/styles";
import { ActivityIndicator } from "react-native-paper";
import { MEETING_STATUS } from "../../utils/Globals";

const MyBookingScreen = ({ navigation }) => {
  const { user } = React.useContext(AuthContext.Context);
  const [fetching, setFetching] = React.useState(true);
  const [meetings, setMeetings] = React.useState([]);

  React.useEffect(() => {
    FetchClientMeetings(user.uid)
      .then((data) => setMeetings(data))
      .catch((err) => console.log(err))
      .finally(() => setFetching(false));
  }, []);

  const handleBookingPress = (meeting) => {
    if (meeting.status === MEETING_STATUS.accepted) {
      navigation.navigate("BookingDetailsScreen", { meetingKey: meeting.key });
    } else {
      alert("Meeting is not accepted yet!");
    }
  };
  return (
    <BackButtonContainer onBackBtnPress={() => navigation.goBack()}>
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={[FONTS.largeTitle]}>My Booking</Text>
        <View style={{ marginTop: 20 }}>
          {fetching && (
            <ActivityIndicator size={"large"} color={COLORS.primary} />
          )}

          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.key}
              style={{ marginVertical: 5 }}
              subject={meeting.subject}
              date={new Date(meeting.meetingTime)}
              imageUrl={meeting.worker.imageUrl}
              name={meeting.worker.firstname + " " + meeting.worker.lastname}
              status={meeting.status}
              onPress={() => handleBookingPress(meeting)}
            />
          ))}
        </View>

        {!fetching && meetings.length === 0 && (
          <EmptyCard msg={"No Booking found"} />
        )}
      </View>
    </BackButtonContainer>
  );
};

export default MyBookingScreen;

const styles = StyleSheet.create({});
