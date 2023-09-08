import {
  FetchMeetingRequestsByWorkerId,
  FetchUserInfo,
  UpdateMeetingStatus,
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

export {
  FetchPeddingRequestMeetings,
  AcceptMeetingRequest,
  RejectMeetingRequest,
};
