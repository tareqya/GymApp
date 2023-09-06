import {
  CreateNewUser,
  FetchUserInfo,
  LoginUser,
  LogoutUser,
  UpdateUserInfo,
  FetchImageUrl,
} from "./Firebase";
import { USER_KEY } from "./Globals";
import {
  getDataFromStorage,
  removeDataFromStorage,
  saveDataToStorage,
} from "./LocalStorage";

const Signin = async ({ email, password }) => {
  try {
    const uid = await LoginUser({ email, password });
    if (!uid) {
      throw "Email or password is incorrect";
    }
    const user = await FetchUserInfo({ uid });
    await saveDataToStorage(USER_KEY, user);
    return user;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const Signup = async ({ email, password, userInfo }) => {
  try {
    const uid = await CreateNewUser({ email, password });

    if (!uid) {
      throw "Failed to create new user";
    }
    const user = {
      uid,
      email,
      ...userInfo,
      imageUrl: "",
    };
    await UpdateUserInfo(user);

    await saveDataToStorage(USER_KEY, user);
    return user;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const Signout = async () => {
  try {
    await LogoutUser();
    removeDataFromStorage(USER_KEY);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const CurrentUser = async () => {
  const user = await getDataFromStorage(USER_KEY, undefined);
  return user;
};

const SyncUser = async ({ uid }) => {
  const user = await FetchUserInfo({ uid });
  if (user.imageUrl) {
    user.imageUrl = await FetchImageUrl({ imagePath: user.imageUrl });
  }
  await saveDataToStorage(USER_KEY, user);
  return user;
};

export { Signin, Signup, Signout, CurrentUser, SyncUser };
