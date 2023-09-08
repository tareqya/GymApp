import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { COLORS, FONTS } from "../../assets/styles";

const Time = ({ time, selectedTime }) => {
  return (
    <View>
      <Text
        style={[
          styles.timeText,
          { color: selectedTime == time ? COLORS.white : COLORS.lightText },
        ]}
      >
        {time}
      </Text>
    </View>
  );
};
const TimePicker = ({
  hours = [],
  selectedTime = "12:30",
  onTimeSelect = (time) => {},
  style = {},
}) => {
  return (
    <View style={[styles.continer, style]}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={hours}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.timeListItemWrapper,
              {
                backgroundColor:
                  selectedTime == item ? COLORS.primary : COLORS.white,
              },
            ]}
            onPress={() => onTimeSelect(item)}
          >
            <Time time={item} selectedTime={selectedTime} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
  },
  timeListItemWrapper: {
    marginHorizontal: 10,
    borderRadius: 5,
    padding: 5,
  },
  timeText: {
    ...FONTS.caption,
    fontWeight: "bold",
  },
});
export default TimePicker;
