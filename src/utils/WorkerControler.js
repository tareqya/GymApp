import {
  FetchMeetingRequestsByWorkerId,
  FetchMeetingsByWorkerUid,
  FetchUserInfo,
  UpdateMeetingStatus,
  FetchMeeting,
} from "./Firebase";
import { MEETING_STATUS } from "./Globals";

const FetchPeddingRequestMeetings = async (uid) => {
  try {
    const meetings = await FetchMeetingRequestsByWorkerId({ workerUid: uid });
    for (let i = 0; i < meetings.length; i++) {
      meetings[i].client = await FetchUserInfo({
        uid: meetings[i].clientUid,
      });
    }
    return meetings;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const RejectMeetingRequest = async (meetingKey) => {
  try {
    return await UpdateMeetingStatus({
      meetingKey,
      status: MEETING_STATUS.rejected,
    });
  } catch (err) {
    return false;
  }
};

const AcceptMeetingRequest = async (meetingKey) => {
  try {
    return await UpdateMeetingStatus({
      meetingKey,
      status: MEETING_STATUS.accepted,
    });
  } catch (err) {
    return false;
  }
};

const FetchWorkerApprovedMeetings = async (workerUid) => {
  try {
    let meetings = await FetchMeetingsByWorkerUid({ workerUid });
    meetings = meetings.filter(
      (meeting) => meeting.status === MEETING_STATUS.accepted
    );
    for (let i = 0; i < meetings.length; i++) {
      meetings[i].client = await FetchUserInfo({
        uid: meetings[i].clientUid,
      });
    }

    return meetings;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const FetchWorkerClientMeeting = async (meetingKey) => {
  try {
    const meeting = await FetchMeeting({ meetingKey });
    const client = await FetchUserInfo({ uid: meeting.clientUid });

    meeting.client = client;

    return meeting;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export {
  FetchPeddingRequestMeetings,
  AcceptMeetingRequest,
  RejectMeetingRequest,
  FetchWorkerApprovedMeetings,
  FetchWorkerClientMeeting,
};
