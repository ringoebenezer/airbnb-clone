import { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { Listing } from "@/interfaces/listing";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ listings: items, category }: Props) => {
  const listRef = useRef<FlatList>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<Listing> = ({ item }) => (
    <Link href={`/(listing)/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          entering={FadeInRight}
          exiting={FadeOutLeft}
          className="my-2 justify-center items-center">
          <Image
            resizeMode="cover"
            source={{ uri: item.medium_url }}
            className="w-[95%] h-[310] rounded-md"
          />
          <TouchableOpacity
            style={{ position: "absolute", right: 30, top: 30 }}>
            <Ionicons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>

          <View className="p-2 w-full flex-row justify-between">
            <Text className="font-semibold">{item.name}</Text>
            <View className="flex-row gap-3">
              <Ionicons name="star" size={16} />
              <Text className="font-semibold">
                {item.review_scores_rating / 20}
              </Text>
            </View>
          </View>

          <Text className="w-full p-2 text-gray-500">{item.room_type}</Text>
          <View className="w-full flex-row p-2">
            <Text>€ {item.price}</Text>
            <Text>night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View className="flex-1 bg-[#FDFFFF]">
      <FlatList
        ref={listRef}
        data={loading ? [] : items}
        renderItem={renderRow}
      />
    </View>
  );
};

export default Listings;
