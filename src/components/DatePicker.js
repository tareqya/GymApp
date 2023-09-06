import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { CompareDateObjects } from "../utils/UtilsFunctions";
import { COLORS, FONTS } from "../../assets/styles";

const DayItem = ({
  dayNum,
  dayName,
  isSelected = false,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.dayWrapper,
        { backgroundColor: isSelected ? COLORS.primary : COLORS.white },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.dayName,
          { color: isSelected ? COLORS.white : COLORS.lightText },
        ]}
      >
        {dayName}
      </Text>
      <Text
        style={[
          styles.dayNum,
          { color: isSelected ? COLORS.white : COLORS.lightText },
        ]}
      >
        {dayNum}
      </Text>
    </TouchableOpacity>
  );
};

const DatePicker = ({
  labels,
  months,
  onDateChange,
  selectCurrentDate = false,
  style = {},
  currentDate = new Date(),
}) => {
  const [days, setDays] = useState([
    {
      dayName: labels[0],
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay()
      ),
      isSelected: false,
    },
    {
      dayName: labels[1],
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() + 1
      ),
      isSelected: false,
    },
    {
      dayName: labels[2],
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() + 2
      ),
      isSelected: false,
    },
    {
      dayName: labels[3],
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() + 3
      ),
      isSelected: false,
    },
    {
      dayName: labels[4],
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() + 4
      ),
      isSelected: false,
    },
    {
      dayName: labels[5],
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() + 5
      ),
      isSelected: false,
    },
    {
      dayName: labels[6],
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() + 6
      ),
      isSelected: false,
    },
  ]);

  useEffect(() => {
    if (selectCurrentDate) {
      for (let i = 0; i < days.length; i++) {
        if (CompareDateObjects(days[i].date, currentDate)) {
          handleOnDateSelect(i);
          break;
        }
      }
      onDateChange(currentDate);
    }
  }, []);

  const updateDays = (selectedDate) => {
    for (let i = 0; i < days.length; i++) {
      const startOfWeek = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() - selectedDate.getDay()
      );
      startOfWeek.setDate(startOfWeek.getDate() + i);
      days[i].date = startOfWeek;
      days[i].isSelected = false;
    }

    setDays(days);
  };

  const handleOnDateSelect = (index) => {
    for (let i = 0; i < days.length; i++) {
      days[i].isSelected = false;
    }
    days[index].isSelected = true;
    setDays(days);
  };

  const handleOnWeekChange = (num) => {
    const _currentDate = new Date(currentDate.getTime());
    _currentDate.setDate(currentDate.getDate() + num);
    onDateChange(_currentDate);
    updateDays(_currentDate);
  };

  return (
    <View style={[styles.continer, style]}>
      <View style={styles.header}>
        <MaterialIcons
          name={"arrow-back-ios"}
          size={20}
          color={COLORS.text}
          onPress={() => {
            handleOnWeekChange(-7);
          }}
        />

        <Text style={styles.date}>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>

        <MaterialIcons
          name={"arrow-forward-ios"}
          size={20}
          color={COLORS.text}
          onPress={() => {
            handleOnWeekChange(7);
          }}
        />
      </View>

      <View style={styles.daysItemWrapper}>
        {days.map(({ dayName, date, isSelected }, index) => (
          <DayItem
            dayName={dayName}
            dayNum={date.getDate()}
            key={index.toString()}
            isSelected={isSelected}
            onPress={() => {
              handleOnDateSelect(index);
              onDateChange(days[index].date);
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: COLORS.white,
    height: 150,
    borderRadius: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 20,
  },
  date: {
    ...FONTS.body3,
  },
  daysItemWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dayWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  dayName: {
    ...FONTS.body3,
  },
  dayNum: {
    ...FONTS.h3,
  },
});
export default DatePicker;
