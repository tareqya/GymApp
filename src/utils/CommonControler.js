import { UpdateUserInfo, UploadImage } from "./Firebase";

const UploadProfileImage = async (imagePath, uid) => {
  try {
    const imageUrl = await UploadImage({ imagePath, uid });
    return imageUrl;
  } catch (err) {
    console.log(err);
    return "";
  }
};

const UpdateProfileAccount = async (user) => {
  try {
    const result = await UpdateUserInfo({ ...user });
    if (!result) throw "failed to update profile";
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export { UploadProfileImage, UpdateProfileAccount };
