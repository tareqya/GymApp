import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

import { Container, EmptyCard, MeetingRequestCard } from "../../components";
import { AuthContext } from "../../context";
import { COLORS, FONTS, Images } from "../../../assets/styles";
import {
  AcceptMeetingRequest,
  FetchPeddingRequestMeetings,
  RejectMeetingRequest,
} from "../../utils/WorkerControler";

const HomeScreen = () => {
  const { user } = React.useContext(AuthContext.Context);
  const [requestMeetings, setRequestMeetings] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);

  React.useEffect(() => {
    FetchPeddingRequestMeetings(user.uid)
      .then((response) => setRequestMeetings(response))
      .finally(() => setFetching(false));
  }, []);

  const handleAcceptMeeting = async (meeting) => {
    const result = await AcceptMeetingRequest(meeting.key);
    if (result) {
      alert("Meeting accepted");
      setRequestMeetings((prev) =>
        prev.filter((item) => item.key !== meeting.key)
      );
    } else {
      alert("Failed to accept meeting");
    }
  };
  const handleRejectMeeting = async (meeting) => {
    const result = await RejectMeetingRequest(meeting.key);
    if (result) {
      alert("Meeting rejected");
      setRequestMeetings((prev) =>
        prev.filter((item) => item.key !== meeting.key)
      );
    } else {
      alert("Failed to reject meeting");
    }
  };

  return (
    <Container statusBar="light" safeAreaBackground={COLORS.primary}>
      <View style={styles.container}>
        {/* header user name */}
        <View style={styles.header}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={
                user.imageUrl ? { uri: user.imageUrl } : Images.PROFILE_IMAGE
              }
              style={styles.profileImage}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={[FONTS.body2, { color: COLORS.white }]}>
              Hello <Text style={[FONTS.h2]}>{user.firstname}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={FONTS.h1}>Meeting Requests</Text>
          {fetching && (
            <ActivityIndicator
              size={"large"}
              style={{ marginTop: 20 }}
              color={COLORS.primary}
            />
          )}

          {!fetching && requestMeetings.length === 0 && (
            <EmptyCard msg={"No new meetings found"} />
          )}
          {requestMeetings.map((meeting) => (
            <MeetingRequestCard
              key={meeting.key}
              meetingTime={meeting.meetingTime}
              name={`${meeting.client.firstname} ${meeting.client.lastname}`}
              imageUrl={meeting.client.imageUrl}
              subject={meeting.subject}
              onAccept={() => handleAcceptMeeting(meeting)}
              onReject={() => handleRejectMeeting(meeting)}
            />
          ))}
        </View>
      </View>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  container: {
    backgroundColor: COLORS.primary,
  },
  body: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: COLORS.background,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
  },
});
