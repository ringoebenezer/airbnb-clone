import { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { Link } from "expo-router";
import * as Haptics from "expo-haptics";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";

const categories = [
  {
    name: "Tiny Homes",
    icon: "home",
  },
  {
    name: "Cabins",
    icon: "house-siding",
  },
  {
    name: "Trending",
    icon: "local-fire-department",
  },
  {
    name: "Play",
    icon: "videogame-asset",
  },
  {
    name: "City",
    icon: "apartment",
  },
  {
    name: "Beachfront",
    icon: "beach-access",
  },
  {
    name: "Countryside",
    icon: "nature-people",
  },
];

interface Props {
  onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected?.measure(x => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    onCategoryChanged(categories[index].name);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="h-[48%] mb-2 flex-row justify-between items-center px-3">
        <Link href={"/(modals)/booking"} asChild className=" w-[85%]">
          <TouchableOpacity className="flex-row p-2">
            <View className="w-full flex-row border border-[#c2c2c2] rounded-3xl p-1.5">
              <View className="justify-center mr-3">
                <Ionicons name="search" size={24} />
              </View>

              <View>
                <Text style={{ fontFamily: "mon-sb" }}>Where to?</Text>
                <Text className="text-grey" style={{ color: Colors.grey }}>
                  Anywhere · Any week · Add guests
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity className="justify-center items-center rounded-full h-auto border border-[#A2A0A2]">
          <View className="p-2">
            <Ionicons name="options-outline" size={24} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        className="h-[48%]"
        contentContainerStyle={{
          gap: 30,
          alignItems: "center",
          paddingHorizontal: 16,
        }}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => selectCategory(index)}
            ref={el => (itemsRef.current[index] = el)}
            className={`${
              activeIndex === index
                ? "items-center justify-center border-b-4 p-1"
                : "items-center justify-center pb-2"
            }`}>
            <MaterialIcons
              size={24}
              name={item.icon as any}
              color={activeIndex === index ? "#000" : Colors.grey}
            />
            <Text
              className={`${
                activeIndex === index ? " text-black" : `text-${Colors.grey}`
              }`}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreHeader;
