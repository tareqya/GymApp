import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Foundation from "react-native-vector-icons/Foundation";

const CalendarIcon = ({ color = "#0e1111", size = 25 }) => (
  <Entypo name="calendar" size={size} color={color} />
);

const CartIcon = ({ color = "#0e1111", size = 25 }) => (
  <Entypo name="shopping-cart" color={color} size={size} />
);

const ProfileIcon = ({ color = "#0e1111", size = 25 }) => (
  <MaterialIcons name="person" color={color} size={size} />
);

const HomeIcon = ({ color = "#0e1111", size = 25 }) => (
  <Entypo name="home" color={color} size={size} />
);

const CancelIcon = ({ color = "#0e1111", size = 25 }) => (
  <AntDesign name="close" color={color} size={size} />
);

const LeftArrowIcon = ({ color = "#0e1111", size = 25 }) => (
  <Feather name="chevron-left" color={color} size={size} />
);

const RightArrowIcon = ({ color = "#0e1111", size = 25 }) => (
  <Feather name="chevron-right" color={color} size={size} />
);

const DownArrowIcon = ({ color = "#0e1111", size = 25 }) => (
  <Feather name="chevron-down" color={color} size={size} />
);

const UpArrowIcon = ({ color = "#0e1111", size = 25 }) => (
  <Feather name="chevron-up" color={color} size={size} />
);

const LogoutIcon = ({ color = "#0e1111", size = 25 }) => (
  <MaterialIcons size={size} color={color} name="logout" />
);

const SoundIcon = ({ color = "#0e1111", size = 25 }) => (
  <SimpleLineIcons name="volume-2" color={color} size={size} />
);

const FavoriteIcon = ({ color = "#0e1111", size = 25 }) => (
  <MaterialIcons size={size} color={color} name="favorite" />
);

const FavoriteOutlineIcon = ({ color = "#0e1111", size = 25 }) => (
  <MaterialIcons size={size} color={color} name="favorite-outline" />
);

const PointerIcon = ({ color = "#0e1111", size = 25 }) => (
  <EvilIcons name="pointer" color={color} size={size} />
);
const Info2Icon = ({ color = "#FFDD6B", size = 25 }) => (
  <Ionicons name="information-circle-outline" color={color} size={size} />
);

const EyeIcon = ({ color = "#0e1111", size = 25 }) => (
  <MaterialIcons name="remove-red-eye" color={color} size={size} />
);

const RecordIcon = ({ color = "#FFDD6B", size = 25 }) => (
  <Fontisto size={size} color={color} name={"record"} />
);

const MicIcon = ({ color = "#FFDD6B", size = 25 }) => (
  <Fontisto size={size} color={color} name={"mic"} />
);

const PauseIcon = ({ color = "#FFDD6B", size = 25 }) => (
  <AntDesign size={size} color={color} name={"pause"} />
);

const PlayIcon = ({ color = "#FFDD6B", size = 25 }) => (
  <AntDesign size={size} color={color} name={"playcircleo"} />
);

const ClockIcon = ({ color = "#FFDD6B", size = 25 }) => (
  <Fontisto size={size} color={color} name={"clock"} />
);

const LocationIcon = ({ color = "#FFDD6B", size = 25 }) => (
  <EvilIcons size={size} color={color} name="location" />
);

const ShopIcon = ({ color = "#0e1111", size = 25 }) => (
  <Entypo name="shop" color={color} size={size} />
);

const LoopIcon = ({ color = "#0e1111", size = 25 }) => (
  <Foundation name="loop" color={color} size={size} />
);

const CheckIcon = ({ color = "#FFDD6B", size = 25 }) => (
  <AntDesign name={"check"} color={color} size={size} />
);

const PhoneIcon = ({ color = "#FFDD6B", size = 25 }) => (
  <Entypo color={color} size={size} name="phone" />
);

const MinusIcon = ({ color = "#FFDD6B", size = 25 }) => (
  <Entypo name="minus" color={color} size={size} />
);

const PackageIcon = ({ color = "#FFDD6B", size = 25 }) => (
  <Feather name="package" color={color} size={size} />
);

export default {
  PackageIcon,
  MinusIcon,
  PhoneIcon,
  CheckIcon,
  LoopIcon,
  ShopIcon,
  LocationIcon,
  ClockIcon,
  EyeIcon,
  CancelIcon,
  LeftArrowIcon,
  RightArrowIcon,
  LogoutIcon,
  DownArrowIcon,
  SoundIcon,
  FavoriteIcon,
  FavoriteOutlineIcon,
  PointerIcon,
  Info2Icon,
  MicIcon,
  RecordIcon,
  UpArrowIcon,
  PauseIcon,
  PlayIcon,
  HomeIcon,
  ProfileIcon,
  CartIcon,
  CalendarIcon,
};
