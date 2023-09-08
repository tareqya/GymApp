import {
  FetchTrainers,
  CreateMeeting,
  FetchMeetingsByClientId,
  FetchUserInfo,
  UpdateSubscription,
  FetchMeeting,
  UploadImageToMeeting,
  RemoveImageFromMeeting,
  FetchProducts,
  CreateOrder,
  UpdateProductQuantity,
  FetchOrdersByUid,
  FetchProductById,
} from "./Firebase";
import { ORDER_STATUS } from "./Globals";

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

const FetchStoreProducts = async () => {
  try {
    const products = await FetchProducts();
    return products;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const CreateClientOrder = async (uid, address, product, quantity) => {
  try {
    // Get the current date
    const currentDate = new Date();
    // Add 15 days to the current date
    currentDate.setDate(currentDate.getDate() + 15);

    const order = {
      clientUid: uid,
      address: address,
      productId: product.key,
      quantity: quantity || 1,
      status: ORDER_STATUS.pending,
      orderTime: new Date().getTime(),
      deliveryTime: currentDate.getTime(),
      totalPrice: product.price * quantity,
    };

    const result = await CreateOrder({ order });

    return (
      result &&
      (await UpdateProductQuantity({
        productKey: product.key,
        quantity: product.quantity - (quantity || 1),
      }))
    );
  } catch (err) {
    console.log(err);
    return false;
  }
};

const FetchClientOrders = async (uid) => {
  try {
    const orders = await FetchOrdersByUid({ clientUid: uid });
    for (let i = 0; i < orders.length; i++) {
      const product = await FetchProductById({
        productId: orders[i].productId,
      });
      if (product) {
        orders[i].product = product;
      } else {
        throw new Error("Product not found");
      }
    }
    return orders;
  } catch (err) {
    console.log(err);
    return [];
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
  FetchStoreProducts,
  CreateClientOrder,
  FetchClientOrders,
};
