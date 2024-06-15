import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

const Id = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Id;
