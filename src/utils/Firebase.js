import uuid from "react-native-uuid";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getReactNativePersistence,
  signOut,
} from "firebase/auth";
import {
  update,
  getDatabase,
  ref as databaseRef,
  get,
  query,
  orderByChild,
  equalTo,
  push,
} from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_TYPES } from "./Globals";

const firebaseConfig = {
  apiKey: "AIzaSyA_X7cykz3ZRbuGdtlSBWoGZaWbW0Afti0",
  authDomain: "gym-app-2167d.firebaseapp.com",
  databaseURL: "https://gym-app-2167d-default-rtdb.firebaseio.com",
  projectId: "gym-app-2167d",
  storageBucket: "gym-app-2167d.appspot.com",
  messagingSenderId: "518522632715",
  appId: "1:518522632715:web:ad6125a89b378de8da650e",
};

const USER_TABLE = "Users";
const MEETING_TABLE = "Meetings";
const PRODUCT_TABLE = "Products";
const ORDER_TABLE = "Orders";

let app = undefined;
let auth = undefined;
let database = undefined;
let storage = undefined;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
  storage = getStorage(app);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  database = getDatabase(app);
  auth = getAuth(app);
  storage = getStorage(app);
}

const LoginUser = async ({ email, password }) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user.uid;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const LogoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const CreateNewUser = async ({ email, password }) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user.uid;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const UpdateUserInfo = async ({
  uid,
  email,
  firstname,
  lastname,
  phone,
  accountType,
  address = "",
}) => {
  try {
    const user = {
      uid,
      email,
      firstname,
      lastname,
      phone,
      accountType,
      address,
    };
    const userRef = databaseRef(database, `${USER_TABLE}/${uid}`);
    await update(userRef, user);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const FetchUserInfo = async ({ uid }) => {
  try {
    const userRef = databaseRef(database, `${USER_TABLE}/${uid}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
      throw "User does not exist!";
    }
    const _user = snapshot.val();
    if (_user.imageUrl) {
      _user.imageUrl = await FetchImageUrl({ imagePath: _user.imageUrl });
    }
    return _user;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const FetchImageUrl = async ({ imagePath }) => {
  try {
    const url = await getDownloadURL(storageRef(storage, imagePath));
    return url;
  } catch (err) {
    console.log(err);
    return "";
  }
};

const FetchTrainers = async () => {
  try {
    const refUsers = databaseRef(database, USER_TABLE);
    const _query = query(
      refUsers,
      orderByChild("accountType"),
      equalTo(USER_TYPES.worker)
    );
    const snapshot = await get(_query);
    if (!snapshot.exists()) {
      throw "There is no workers are available!";
    }
    const workers = [];
    const _users = snapshot.val();
    for (let key in _users) {
      if (_users[key].imageUrl) {
        _users[key].imageUrl = await FetchImageUrl({
          imagePath: _users[key].imageUrl,
        });
      }
      workers.push(_users[key]);
    }

    return workers;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const CreateMeeting = async ({ meeting }) => {
  try {
    const meetingRef = databaseRef(database, MEETING_TABLE);
    await push(meetingRef, meeting);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const FetchMeetingsByClientId = async ({ clientUid }) => {
  try {
    const meetingRef = databaseRef(database, `${MEETING_TABLE}`);
    const _query = query(
      meetingRef,
      orderByChild("clientUid"),
      equalTo(clientUid)
    );

    const snapshot = await get(_query);
    if (!snapshot.exists()) {
      throw "There is no meetings are available!";
    }
    const meetings = [];
    const _meetings = snapshot.val();
    for (let key in _meetings) {
      meetings.push({ ..._meetings[key], key });
    }
    return meetings.sort((a, b) => b.meetingTime - a.meetingTime);
  } catch (err) {
    console.log(err);
    return [];
  }
};

const UploadImage = async ({ imagePath, uid }) => {
  try {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    const ex_file = imagePath.split(".").pop();
    const image = `ProfileImages/${uid}.${ex_file}`;
    const storageImagePath = storageRef(storage, image);
    const metadata = { contentType: `image/${ex_file}` };
    await uploadBytes(storageImagePath, blob, metadata);
    await update(databaseRef(database, `${USER_TABLE}/${uid}`), {
      imageUrl: image,
    });
    return await FetchImageUrl({ imagePath: image });
  } catch (err) {
    console.log(err);
    return "";
  }
};

const UpdateSubscription = async ({ uid, months }) => {
  try {
    const subscriptionDate = new Date();
    subscriptionDate.setMonth(subscriptionDate.getMonth() + months);
    const userRef = databaseRef(database, `${USER_TABLE}/${uid}`);
    await update(userRef, { subscription: subscriptionDate.getTime() });
    return subscriptionDate.getTime();
  } catch (err) {
    console.log(err);
    return 0;
  }
};

const FetchMeeting = async ({ meetingKey }) => {
  try {
    const meetingRef = databaseRef(database, `${MEETING_TABLE}/${meetingKey}`);
    const snapshot = await get(meetingRef);
    if (!snapshot.exists()) {
      throw "Meeting does not exist!";
    }
    const meeting = snapshot.val();
    if (meeting.attachedImages && meeting.attachedImages.length > 0) {
      for (let i = 0; i < meeting.attachedImages.length; i++) {
        meeting.attachedImages[i].imageUrl = await FetchImageUrl({
          imagePath: meeting.attachedImages[i].imageStore,
        });
      }

      meeting.attachedImages = meeting.attachedImages.sort(
        (a, b) => a.uploadTime - b.uploadTime
      );
    } else {
      meeting.attachedImages = [];
    }

    return meeting;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const UploadImageToMeeting = async ({ prevImages, imagePath, meetingKey }) => {
  try {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    const ex_file = imagePath.split(".").pop();
    const image = `MeetingImages/${meetingKey}_${uuid.v4()}.${ex_file}`;
    const storageImagePath = storageRef(storage, image);
    const metadata = { contentType: `image/${ex_file}` };
    await uploadBytes(storageImagePath, blob, metadata);
    const _image = {
      imageStore: image,
      uploadTime: new Date().getTime(),
      imageUrl: "",
    };
    await update(databaseRef(database, `${MEETING_TABLE}/${meetingKey}`), {
      attachedImages: [...prevImages, _image],
    });
    _image.imageUrl = await FetchImageUrl({ imagePath: _image.imageStore });
    return _image;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const RemoveImageFromMeeting = async ({ images, imageStore, meetingKey }) => {
  try {
    await update(databaseRef(database, `${MEETING_TABLE}/${meetingKey}`), {
      attachedImages: [...images],
    });
    const storageImagePath = storageRef(storage, imageStore);
    await deleteObject(storageImagePath);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const FetchProducts = async () => {
  try {
    const snapshot = await get(databaseRef(database, PRODUCT_TABLE));
    if (!snapshot.exists()) {
      throw "There is no products are available!";
    }
    const products = [];
    const _products = snapshot.val();
    for (let key in _products) {
      _products[key].imageUrl = await FetchImageUrl({
        imagePath: _products[key].imageStore,
      });
      _products[key].key = key;
      products.push(_products[key]);
    }

    return products;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const FetchProductById = async ({ productId }) => {
  try {
    const productRef = databaseRef(database, `${PRODUCT_TABLE}/${productId}`);
    const snapshot = await get(productRef);
    if (!snapshot.exists()) {
      throw "Product does not exist!";
    }
    const product = snapshot.val();
    product.imageUrl = await FetchImageUrl({ imagePath: product.imageStore });
    return product;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const CreateOrder = async ({ order }) => {
  try {
    await push(databaseRef(database, ORDER_TABLE), order);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const UpdateProductQuantity = async ({ productKey, quantity }) => {
  try {
    const productRef = databaseRef(database, `${PRODUCT_TABLE}/${productKey}`);
    await update(productRef, { quantity });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const FetchOrdersByUid = async ({ clientUid }) => {
  try {
    const orderRef = databaseRef(database, `${ORDER_TABLE}`);
    const _query = query(
      orderRef,
      orderByChild("clientUid"),
      equalTo(clientUid)
    );

    const snapshot = await get(_query);
    if (!snapshot.exists()) {
      throw "There is no orders are available!";
    }
    const orders = [];
    const _orders = snapshot.val();
    for (let key in _orders) {
      orders.push({ ..._orders[key], key });
    }
    return orders.sort((a, b) => b.orderTime - a.orderTime);
  } catch (err) {
    console.log(err);
    return [];
  }
};

export {
  UploadImage,
  LoginUser,
  LogoutUser,
  CreateNewUser,
  UpdateUserInfo,
  FetchUserInfo,
  CreateMeeting,
  FetchTrainers,
  FetchImageUrl,
  FetchMeetingsByClientId,
  UpdateSubscription,
  FetchMeeting,
  UploadImageToMeeting,
  RemoveImageFromMeeting,
  FetchProducts,
  CreateOrder,
  UpdateProductQuantity,
  FetchProductById,
  FetchOrdersByUid,
};
