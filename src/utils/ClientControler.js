import {
  FetchTrainers,
  CreateMeeting,
  FetchMeetingsByClientId,
  FetchUserInfo,
  UpdateSubscription,
  FetchMeeting,
  UploadImageToMeeting,
  RemoveImageFromMeeting,
} from "./Firebase";

const FetchWorkers = async () => {
  try {
    const workers = await FetchTrainers();
    return workers;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const BookMeeting = async (meeting) => {
  try {
    return await CreateMeeting({ meeting });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const FetchClientMeetings = async (uid) => {
  try {
    let meetings = await FetchMeetingsByClientId({ clientUid: uid });

    for (let i = 0; i < meetings.length; i++) {
      const worker = await FetchUserInfo({ uid: meetings[i].workerUid });
      meetings[i].worker = worker;
    }
    return meetings;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const UpdateClientSubscription = async (uid, months) => {
  try {
    const subscription = await UpdateSubscription({ uid, months });
    return subscription;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

const FetchClientMeeting = async (meetingKey) => {
  try {
    const meeting = await FetchMeeting({ meetingKey });
    const worker = await FetchUserInfo({ uid: meeting.workerUid });

    meeting.worker = worker;

    return meeting;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const UploadClientMeetingImage = async (prevImages, imagePath, meetingKey) => {
  try {
    return await UploadImageToMeeting({ meetingKey, imagePath, prevImages });
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const RemoveMeetingImage = async (images, imageStore, meetingKey) => {
  try {
    return await RemoveImageFromMeeting({ images, imageStore, meetingKey });
  } catch (err) {
    console.log(err);
    return false;
  }
};

export {
  FetchWorkers,
  BookMeeting,
  FetchClientMeetings,
  FetchClientMeeting,
  UpdateClientSubscription,
  UploadClientMeetingImage,
  RemoveMeetingImage,
};
