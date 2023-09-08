import { Images } from "../../assets/styles";

const USER_KEY = "user";

const ORDER_STATUS = {
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  pending: "Pending",
};

const USER_TYPES = {
  admin: "admin",
  client: "client",
  worker: "worker",
};

const MEETING_STATUS = {
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const HOURS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

const GYM_NAME = "Great Shape Gym";
const GYM_LOCATION = "Bar Yehuda Road 113, Nesher";
const WORK_TIMES = "09:00 AM - 23:00 PM";

const CATEGORIES = [
  { label: "Protein", value: "Protein", image: Images.PROTEIN_IMAGE },
  {
    label: "Healthy meals",
    value: "Healthy meals",
    image: Images.HEALTHY_IMAGE,
  },
  { label: "Vitamin", value: "Vitamin", image: Images.VITAMIN_IMAGE },
];

export {
  USER_KEY,
  USER_TYPES,
  GYM_NAME,
  GYM_LOCATION,
  WORK_TIMES,
  MONTHS,
  HOURS,
  MEETING_STATUS,
  CATEGORIES,
  ORDER_STATUS,
};
