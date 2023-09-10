import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BackButtonContainer, EmptyCard, MeetingCard } from "../../components";
import { AuthContext } from "../../context";
import { FetchWorkerApprovedMeetings } from "../../utils/WorkerControler";
import { COLORS, FONTS } from "../../../assets/styles";
import { ActivityIndicator } from "react-native-paper";
import { MEETING_STATUS } from "../../utils/Globals";

const MyBookingScreen = ({ navigation }) => {
  const { user } = React.useContext(AuthContext.Context);
  const [fetching, setFetching] = React.useState(true);
  const [upCommingMeetings, setUpCommingMeetings] = React.useState([]);
  const [todayMeetings, setTodayMeetings] = React.useState([]);

  const manageMeetings = (meetings) => {
    const _todayMeetings = meetings.filter(
      (meeting) => meeting.meetingTime == new Date().getTime()
    );
    setTodayMeetings(_todayMeetings);
    if (_todayMeetings) {
      const _upCommingMeetings = [];
      for (let meeting of meetings) {
        if (!_todayMeetings.find((m) => m.key === meeting.key)) {
          _upCommingMeetings.push(meeting);
        }
      }
      setUpCommingMeetings(_upCommingMeetings);
    } else {
      setUpCommingMeetings(meetings);
    }
  };

  React.useEffect(() => {
    FetchWorkerApprovedMeetings(user.uid)
      .then((data) => manageMeetings(data))
      .catch((err) => console.log(err))
      .finally(() => setFetching(false));
  }, []);

  const handleBookingPress = (meeting) => {
    if (meeting.status === MEETING_STATUS.accepted) {
      navigation.navigate("BookingDetailsScreen", {
        meetingKey: meeting.key,
      });
    } else {
      alert("Meeting is not accepted yet!");
    }
  };

  return (
    <BackButtonContainer onBackBtnPress={navigation.goBack}>
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={[FONTS.largeTitle]}>My Booking</Text>
        <View style={{ marginTop: 20 }}>
          {fetching && (
            <ActivityIndicator size={"large"} color={COLORS.primary} />
          )}
          {/* today meetings */}

          {!fetching && todayMeetings.length === 0 && (
            <>
              <Text style={[FONTS.h2]}>Today meetings</Text>
              <View style={styles.todayMeetingsEmptyMsg}>
                <Text style={[FONTS.body2, { color: COLORS.white }]}>
                  No booking for today!
                </Text>
              </View>
            </>
          )}
          {/* up comming meetings */}
          {!fetching && <Text style={[FONTS.h2]}>Up comming meetings</Text>}
          {upCommingMeetings.map((meeting) => (
            <MeetingCard
              key={meeting.key}
              style={{ marginVertical: 5 }}
              subject={meeting.subject}
              date={new Date(meeting.meetingTime)}
              imageUrl={meeting.client.imageUrl}
              name={meeting.client.firstname + " " + meeting.client.lastname}
              status={meeting.status}
              onPress={() => handleBookingPress(meeting)}
            />
          ))}
        </View>

        {!fetching && upCommingMeetings.length === 0 && (
          <EmptyCard msg={"No Booking found"} />
        )}
      </View>
    </BackButtonContainer>
  );
};

export default MyBookingScreen;

const styles = StyleSheet.create({
  todayMeetingsEmptyMsg: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.danger,
  },
});
